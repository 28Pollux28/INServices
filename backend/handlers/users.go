package handlers

import (
	"github.com/asaskevich/govalidator"
	"github.com/disintegration/imaging"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"inservices/models"
	"inservices/utils"
	"log"
	"os"
	"strconv"
)

func GetPubUser(c *fiber.Ctx) error {
	idString := c.Params("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid id",
		})
	}
	var user models.User
	db := c.Locals("db").(*gorm.DB)
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	return c.JSON(user.Public())
}

func UploadUserAvatar(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	id := claims["id"].(float64)
	db := c.Locals("db").(*gorm.DB)
	var user models.User
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	fName, img, err := utils.ExtractImageFromForm(c, "avatar", 1024*1024*5)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid image",
			"err":   err.Error(),
		})
	}

	img50 := imaging.Fill(*img, 50, 50, imaging.Center, imaging.Lanczos)
	img200 := imaging.Fill(*img, 200, 200, imaging.Center, imaging.Lanczos)
	err = imaging.Save(img50, "uploads/users/50/"+fName+".png")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
			"err":   err.Error(),
		})
	}
	err = imaging.Save(img200, "uploads/users/200/"+fName+".png")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}

	oldAvatar := user.Avatar
	user.Avatar = fName + ".png"
	res = db.Save(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	if oldAvatar != "" && oldAvatar != "default_avatar.png" {
		err = os.Remove("uploads/users/50/" + oldAvatar)
		if err != nil {
			log.Println(err.Error())
		}
		err = os.Remove("uploads/users/200/" + oldAvatar)
		if err != nil {
			log.Println(err.Error())
		}
	}
	return c.JSON(fiber.Map{
		"avatar": fName + ".png",
	})
}

func EditUser(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	id := claims["id"].(float64)
	db := c.Locals("db").(*gorm.DB)
	var user models.User
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	var body struct {
		Name                 string `json:"name" form:"name" name:"name"`
		Surname              string `json:"surname" form:"surname" name:"surname"`
		Username             string `json:"username" form:"username" name:"username"`
		OldPassword          string `json:"old_password" form:"old_password" validate:"required,min=6,max=32" name:"old_password"`
		Password             string `json:"password" form:"password" name:"password"`
		PasswordConfirmation string `json:"password_confirmation" form:"password_confirmation" name:"password_confirmation"`
		Email                string `json:"email" form:"email" name:"email"`
		Phone                string `json:"phone" form:"phone" name:"phone"`
	}
	err := c.BodyParser(&body)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}
	if body.Name != "" {
		// Check length of name
		if len(body.Name) > 32 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Name is too long",
			})
		}
		user.Name = body.Name
	}
	if body.Surname != "" {
		// Check length of surname
		if len(body.Surname) > 32 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Surname is too long",
			})
		}
		user.Surname = body.Surname
	}
	if body.Username != "" {
		// Check length of username
		if len(body.Username) > 32 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Username is too long",
			})
		}
		// Check if username is already taken
		var tempUser models.User
		res := db.Where("username = ?", body.Username).First(&tempUser)
		if res.Error == nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Username is already taken",
			})
		}
		user.Username = body.Username
	}
	if body.Email != "" {
		// Check if email is valid
		if !govalidator.IsEmail(body.Email) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Email is not valid",
			})
		}
		// Check if email is already taken
		var tempUser models.User
		res := db.Where("email = ?", body.Email).First(&tempUser)
		if res.Error == nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Email is already taken",
			})
		}
		user.Email = body.Email
	}
	if body.Phone != "" {
		user.Phone = body.Phone
	}
	if body.Password != "" {
		// Check length of password
		if len(body.Password) < 8 || len(body.Password) > 32 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Password must be between 8 and 32 characters",
			})
		}
		// Check password strength
		if ok1, ok2, ok3, ok4 := utils.CheckPasswordStrength(body.Password); !(ok1 && ok2 && ok3 && ok4) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Password is too weak",
			})
		}
		if body.Password != body.PasswordConfirmation {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Passwords do not match",
			})
		}
		if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.OldPassword)) != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Incorrect password",
			})
		}
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), 12)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Internal server error",
			})
		}
		user.Password = string(hashedPassword)
	}
	res = db.Save(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	return c.JSON(user.Public())
}

func GetPrivUser(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error1",
		})
	}
	id := claims["id"].(float64)
	db := c.Locals("db").(*gorm.DB)
	var user models.User
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	return c.JSON(user.Private())
}

// GetPubRanking returns the ranking of users based on the karmas they have
func GetPubRanking(c *fiber.Ctx) error {
	db := c.Locals("db").(*gorm.DB)
	var users []rankResult
	// we need to get the ranking of the user and the 10 best users
	res := db.Raw("select *, rank() over (order by karmas desc) as rank from users limit 10").Scan(&users)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	// we need to return the rank version of the users by mapping them
	rankUsers := make([]models.RankUser, 0, len(users))
	for _, user := range users {
		rankUser := models.RankUser{
			PublicUser: models.PublicUser{
				Name:     user.Name,
				Surname:  user.Surname,
				Username: user.Username,
				Avatar:   user.Avatar,
			},
			Karmas: uint(user.Karmas),
			Rank:   user.Rank,
		}
		rankUsers = append(rankUsers, rankUser)
	}
	return c.JSON(rankUsers)
}

type rankResult struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Username string `json:"username"`
	Avatar   string `json:"avatar"`
	Karmas   int    `json:"karmas"`
	Rank     int    `json:"rank"`
}

func GetPrivRanking(c *fiber.Ctx) error {
	db := c.Locals("db").(*gorm.DB)
	// Get user id from JWT
	uToken := c.Locals("user").(*jwt.Token)
	claims, ok := uToken.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	id := uint(claims["id"].(float64))
	var me models.User
	res := db.First(&me, id)
	if res.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	var users []rankResult
	// we need to get the ranking of the user and the 10 best users
	res = db.Raw("select *, rank() over (order by karmas desc) as rank from users limit 10").Scan(&users)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	var rank int
	res2 := db.Raw("select rank from (select t.*, rank() over (order by karmas desc) as rank from users t) t where t.id = ?", id).Scan(&rank)
	if res2.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	// we need to return the rank of the user and the 10 best users
	rankUsers := make([]models.RankUser, 0, len(users)+1)
	rankUsers = append(rankUsers, *me.Rank(rank))
	for _, user := range users {
		rankUser := models.RankUser{
			PublicUser: models.PublicUser{
				Name:     user.Name,
				Surname:  user.Surname,
				Username: user.Username,
				Avatar:   user.Avatar,
			},
			Karmas: uint(user.Karmas),
			Rank:   user.Rank,
		}
		rankUsers = append(rankUsers, rankUser)
	}
	return c.JSON(rankUsers)
}
