package handlers

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/mailjet/mailjet-apiv3-go"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"inservices/email"
	"inservices/models"
	"inservices/utils"
	"reflect"
	"strings"
	"time"
)

type RefreshRequest struct {
	RefreshToken string `json:"refresh"`
}

func Refresh(c *fiber.Ctx) error {
	db := c.Locals("db").(*gorm.DB)
	var refreshRq RefreshRequest
	err := c.BodyParser(&refreshRq)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}
	var rToken models.RefreshToken
	res := db.Where("token = ?", refreshRq.RefreshToken).First(&rToken)
	if res.Error != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid refresh token",
		})
	}
	// if refresh token is valid, generate new token
	parse, err := jwt.Parse(refreshRq.RefreshToken, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.GetEnv("JWT_SECRET", "secret")), nil
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	if !parse.Valid {
		db.Delete(&rToken)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid refresh token",
		})
	}
	claims := parse.Claims.(jwt.MapClaims)
	var user models.User
	res = db.First(&user, claims["id"])
	if res.Error != nil {
		db.Delete(&rToken)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid refresh token",
		})
	}
	t, rt, err := createToken(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	// delete old refresh token
	db.Delete(&rToken)
	// save new refresh token
	newRt := models.RefreshToken{
		Token:  rt,
		UserId: user.ID,
	}
	res2 := db.Create(&newRt)
	if res2.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": res2.Error,
		})
	}

	return c.JSON(fiber.Map{"access": t, "refresh": rt})
}

type RegisterUser struct {
	Name                 string `json:"name" form:"name" validate:"required" name:"name"`
	Surname              string `json:"surname" form:"surname" validate:"required" name:"surname"`
	Username             string `json:"username" form:"username" validate:"required,max=32" name:"username"`
	Password             string `json:"password" form:"password" validate:"required,min=6,max=32" name:"password"`
	PasswordConfirmation string `json:"password_confirmation" form:"password_confirmation" validate:"required,min=6,max=32" name:"password_confirmation"`
	Email                string `json:"email" form:"email" validate:"required,email" name:"email"`
	Phone                string `json:"phone" form:"phone" validate:"required" name:"phone"`
}

func ValidateRegisterUser(user RegisterUser) []*ValidateErrorResponse {
	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		// skip if tag key says it should be ignored
		if name == "-" {
			return ""
		}
		return name
	})
	var errors []*ValidateErrorResponse
	err := validate.Struct(user)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ValidateErrorResponse
			element.FailedField = err.Field()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	// Check for password confirmation
	if user.Password != user.PasswordConfirmation {
		errors = append(errors, &ValidateErrorResponse{
			FailedField: "password_confirmation",
			Tag:         "equal",
			Value:       "password",
		})
	}
	// check for password strength
	isNumber, isUpper, isLower, isSpecial := utils.CheckPasswordStrength(user.Password)
	if !isNumber || !isUpper || !isLower || !isSpecial {
		errors = append(errors, &ValidateErrorResponse{
			FailedField: "password",
			Tag:         "strength",
			Value:       "password",
		})
	}

	return errors
}

// Register creates a new user
func Register(c *fiber.Ctx) error {
	db := c.Locals("db").(*gorm.DB)
	// Parse body into struct
	regUser := new(RegisterUser)
	if err := c.BodyParser(regUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}
	// Validate struct
	errors := ValidateRegisterUser(*regUser)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	// Hash password
	passBytes, _ := bcrypt.GenerateFromPassword([]byte(regUser.Password), bcrypt.DefaultCost)
	hashedPass := string(passBytes)
	user := models.User{
		Name:          regUser.Name,
		Surname:       regUser.Surname,
		Username:      regUser.Username,
		Password:      hashedPass,
		Email:         regUser.Email,
		Phone:         regUser.Phone,
		EmailVerified: false,
	}

	res := db.Create(&user)
	if res.Error != nil {
		// Check if email is already taken
		switch {
		case strings.Contains(res.Error.Error(), "users_email_unique"):
			return c.Status(fiber.StatusConflict).JSON(
				&ValidateErrorResponse{
					FailedField: "email",
					Tag:         "unique",
					Value:       "email",
				},
			)
		case strings.Contains(res.Error.Error(), "users_username_unique"):
			return c.Status(fiber.StatusConflict).JSON(
				&ValidateErrorResponse{
					FailedField: "username",
					Tag:         "unique",
					Value:       "username",
				})
		case strings.Contains(res.Error.Error(), "users_phone_unique"):
			return c.Status(fiber.StatusConflict).JSON(
				&ValidateErrorResponse{
					FailedField: "phone",
					Tag:         "unique",
					Value:       "phone",
				})
		default:
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": res.Error,
			})
		}
	}
	// Send verification email
	client := c.Locals("mailjet").(*mailjet.Client)
	// Generate email verification token
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["email"] = user.Email
	claims["exp"] = jwt.NewNumericDate(time.Now().Add(time.Hour * 24))
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	err = email.SendEmailVerification(client, user, tokenString)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	newToken, refreshToken, err := createToken(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	return c.JSON(fiber.Map{
		"access":  newToken,
		"refresh": refreshToken,
	})
}

type Credentials struct {
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
}

// Login authenticates a user
func Login(c *fiber.Ctx) error {
	// Get credentials from Post request body
	creds := new(Credentials)
	err := c.BodyParser(creds)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}
	emailAdrr := creds.Email
	pass := creds.Password
	// Check in database
	db := c.Locals("db").(*gorm.DB)
	var user models.User
	res := db.Where("email = ?", emailAdrr).First(&user)
	if res.Error != nil {
		// Return Unauthorized if user not found
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid credentials",
		})
	}
	// Check hashed password
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(pass)) != nil {
		// Return Unauthorized if password is incorrect
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid credentials",
		})
	}

	t, rt, err := createToken(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	return c.JSON(fiber.Map{"access": t, "refresh": rt})
}

type VerifyEmailToken struct {
	Token string `json:"token"`
}

func VerifyEmail(c *fiber.Ctx) error {
	db := c.Locals("db").(*gorm.DB)
	token := new(VerifyEmailToken)
	if err := c.BodyParser(token); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}
	// Parse token
	t, err := jwt.Parse(token.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}
	claims, ok := t.Claims.(jwt.MapClaims)
	if !ok || !t.Valid {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid token",
		})
	}
	// Get user from database
	var user models.User
	res := db.First(&user, claims["id"])
	if res.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid token",
		})
	}
	//Check if user is already verified
	//if user.EmailVerified {
	//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	//		"error": "email already verified",
	//	})
	//}
	// Update user
	user.EmailVerified = true
	res = db.Save(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": res.Error,
		})
	}
	// Create new token
	newToken, refreshToken, err := createToken(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	return c.JSON(fiber.Map{
		"access":  newToken,
		"refresh": refreshToken,
	})
}

func createToken(user models.User) (string, string, error) {
	// Create token
	token := jwt.New(jwt.SigningMethodHS256)
	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Minute * 2).Unix()
	claims["id"] = user.ID
	claims["name"] = user.Name
	claims["surname"] = user.Surname
	claims["email"] = user.Email
	claims["phone"] = user.Phone
	claims["email_verified"] = user.EmailVerified
	claims["karmas"] = user.Karmas

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(utils.GetEnv("JWT_SECRET", "secret")))
	if err != nil {
		return "", "", err
	}
	refreshToken := jwt.New(jwt.SigningMethodHS256)
	refreshClaims := refreshToken.Claims.(jwt.MapClaims)
	refreshClaims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	refreshClaims["id"] = user.ID

	rT, err := refreshToken.SignedString([]byte(utils.GetEnv("JWT_SECRET", "secret")))
	if err != nil {
		return "", "", err
	}
	return t, rT, nil
}
