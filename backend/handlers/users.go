package handlers

import (
	"github.com/disintegration/imaging"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
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
			"error": "Internal server error6",
			"err":   err.Error(),
		})
	}
	err = imaging.Save(img200, "uploads/users/200/"+fName+".png")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error7",
		})
	}

	oldAvatar := user.Avatar
	user.Avatar = fName + ".png"
	res = db.Save(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error8",
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
