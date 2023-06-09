package handlers

import (
	"github.com/disintegration/imaging"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
	"image"
	"inservices/models"
	"inservices/utils"
	"log"
	"os"
	"reflect"
	"strings"
)

type CreateOfferInput struct {
	Name        string       `json:"name" validate:"required" form:"name"`
	Description string       `json:"description" validate:"required" form:"description"`
	Price       uint         `json:"price" validate:"required" form:"price"`
	Image       *image.Image `json:"image" form:"image" validate:"required"`
}

func validateOfferInput(input interface{}) []*ValidateErrorResponse {
	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		// skip if tag key says it should be ignored
		if name == "-" {
			return ""
		}
		return name
	})
	var errors []*ValidateErrorResponse
	err := validate.Struct(input)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ValidateErrorResponse
			element.FailedField = err.Field()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

func CreateOffer(c *fiber.Ctx) error {
	uToken := c.Locals("user").(*jwt.Token)
	claims, ok := uToken.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	id := uint(claims["id"].(float64))
	db := c.Locals("db").(*gorm.DB)
	// Check if user exists
	var user models.User
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	// Parse form input
	var input CreateOfferInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input",
			"err":   err.Error(),
		})
	}
	fname, img, err := utils.ExtractImageFromForm(c, "image", 1024*1024*10)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid image",
			"err":   err.Error(),
		})
	}
	input.Image = img
	// Validate input
	errors := validateOfferInput(input)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	// Create offer
	offer := models.Offer{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
	}
	// Save offer to database
	err = db.Model(&user).Association("Offers").Append(&offer)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server errortest",
			"err":   err.Error(),
		})
	}
	// resize image to 300x300
	resized := imaging.Fill(*input.Image, 300, 300, imaging.Center, imaging.Lanczos)
	// save image to disk
	err = imaging.Save(resized, "uploads/offers/300/"+fname+".png")
	if err != nil {
		log.Println("Could not save image to disk : " + err.Error())
	}

	// change image name in database
	offer.Image = fname + ".png"
	db.Omit("AcceptedUserID").Save(&offer)

	return c.JSON(fiber.Map{
		"message": "Offer created",
	})
}

type EditOfferInput struct {
	Name        string       `json:"name" form:"name"`
	Description string       `json:"description" form:"description"`
	Price       uint         `json:"price" form:"price"`
	Image       *image.Image `json:"image" form:"image"`
	Status      string       `json:"status" form:"status"`
	Visible     *bool        `json:"visible" form:"visible"` // pointer to bool because it's optional and it cause a problem with go bool default value
}

func EditOffer(c *fiber.Ctx) error {
	// Get user id from JWT
	uToken := c.Locals("user").(*jwt.Token)
	claims, ok := uToken.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	id := uint(claims["id"].(float64))
	db := c.Locals("db").(*gorm.DB)
	// Check if user exists
	var user models.User
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	// Get offer id from url
	offerID, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid offer id",
		})
	}
	// Check if offer exists
	var offer models.Offer
	res = db.First(&offer, offerID)
	if res.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Offer not found",
		})
	}
	// Check if offer belongs to user
	if offer.UserID != user.ID {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Offer does not belong to user",
		})
	}
	// Check which fields were sent in request
	var input EditOfferInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input",
			"err":   err.Error(),
		})
	}
	fname, img, err := utils.ExtractImageFromForm(c, "image", 1024*1024*10)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": err.Error(),
		})
	}
	input.Image = img
	// Validate input
	errors := validateOfferInput(input)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	// Update offer
	if input.Name != "" {
		offer.Name = input.Name
	}
	if input.Description != "" {
		offer.Description = input.Description
	}
	if input.Price != 0 {
		offer.Price = input.Price
	}
	if input.Image != nil {
		resized := imaging.Fill(*input.Image, 300, 300, imaging.Center, imaging.Lanczos)
		// save image to disk
		err = imaging.Save(resized, "uploads/offers/300/"+fname+".png")
		if err != nil {
			log.Println("Could not save image to disk : " + err.Error())
		} else if offer.Image != "default_offer.png" {
			err = os.Remove("uploads/offers/300/" + offer.Image)
			if err != nil {
				log.Println("Could not delete image : " + err.Error())
			}
		}
		// change image name in database
		offer.Image = fname + ".png"
	}
	if input.Status != "" {
		values := map[string]struct{}{"pending": {}, "accepted": {}, "rejected": {}}
		// Check if status is in accepted, rejected, pending
		if _, ok := values[input.Status]; ok {
			offer.Status = input.Status
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid status",
			})
		}
	}
	if input.Visible != nil {
		offer.Visible = *input.Visible
	}
	db.Save(&offer)
	return c.JSON(fiber.Map{
		"message": "Offer updated",
	})
}

func DeleteOffer(c *fiber.Ctx) error {
	// Get user id from JWT
	uToken := c.Locals("user").(*jwt.Token)
	claims, ok := uToken.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	id := uint(claims["id"].(float64))
	db := c.Locals("db").(*gorm.DB)
	// Check if user exists
	var user models.User
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	// Get offer id from url
	offerID, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid offer id",
		})
	}
	// Check if offer exists
	var offer models.Offer
	res = db.First(&offer, offerID)
	if res.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Offer not found",
		})
	}
	// Check if offer belongs to user
	if offer.UserID != user.ID {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Offer does not belong to user",
		})
	}
	// delete image
	if offer.Image != "default_offer.png" {
		err = os.Remove("uploads/offers/300/" + offer.Image)
		if err != nil {
			log.Println("Could not delete image : " + err.Error())
		}
	}
	// Delete offer
	db.Delete(&offer)
	return c.JSON(fiber.Map{
		"message": "Offer deleted",
	})
}

func GetLatestPubOffers(c *fiber.Ctx) error {
	db := c.Locals("db").(*gorm.DB)
	var offers []models.Offer
	res := db.Order("created_at desc").Limit(15).Find(&offers)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	// map offers to public offers
	publicOffers := make([]models.PublicOffer, 0, len(offers))
	for _, offer := range offers {
		publicOffers = append(publicOffers, offer.Public())
	}
	return c.JSON(publicOffers)
}

func GetPubOffersByUser(c *fiber.Ctx) error {
	db := c.Locals("db").(*gorm.DB)
	// Get user id from url
	userID, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user id",
		})
	}
	// Check if user exists
	var user models.User
	res := db.First(&user, userID)
	if res.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	// Get offers
	var offers []models.Offer
	err = db.Model(&user).Association("Offers").Find(&offers)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	// map offers to public offers
	publicOffers := make([]models.PublicOffer, 0, len(offers))
	for _, offer := range offers {
		publicOffers = append(publicOffers, offer.Public())
	}
	return c.JSON(publicOffers)
}

func GetMyOffers(c *fiber.Ctx) error {
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
	user := models.User{Base: models.Base{ID: id}}
	// Get offers

	var offers []models.Offer
	err := db.Model(&user).Preload("AcceptedUser").Association("Offers").Find(&offers)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	return c.JSON(offers)
}
