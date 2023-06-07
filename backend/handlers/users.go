package handlers

import (
	"bytes"
	"github.com/disintegration/imaging"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"inservice/models"
	"io"
	"log"
	"mime/multipart"
	"net/http"
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
	file, err := c.FormFile("avatar")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid file",
		})
	}
	// check file size
	if file.Size > 1024*1024*5 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "File too big",
		})
	}

	uuidS, err := uuid.NewRandom()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error2",
			"err":   err.Error(),
		})
	}
	fName := uuidS.String()

	// check if file is an image
	open, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid file",
		})
	}
	defer func(open multipart.File) {
		err := open.Close()
		if err != nil {
			log.Println(err)
		}
	}(open)
	buff := make([]byte, 512) // docs tell that it take only first 512 bytes into consideration
	if _, err = open.Read(buff); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid file",
		})
	}
	_, err = open.Seek(0, io.SeekStart)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error3",
		})
	}
	contentType := http.DetectContentType(buff)
	if contentType != "image/jpeg" && contentType != "image/png" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid file",
		})
	}
	var user models.User
	res := db.First(&user, id)
	if res.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	// resize image
	buffer, err := io.ReadAll(open)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error4",
		})
	}

	// resize image
	img, err := imaging.Decode(bytes.NewReader(buffer))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error5",
		})
	}

	img50 := imaging.Fill(img, 50, 50, imaging.Center, imaging.Lanczos)
	img200 := imaging.Fill(img, 200, 200, imaging.Center, imaging.Lanczos)
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
