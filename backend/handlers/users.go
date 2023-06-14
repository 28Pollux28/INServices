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
	var users []models.User
	// we need to get the 10 users with the highest karma
	res := db.Order("karmas desc").Limit(10).Find(&users)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	// we need to return the rank version of the users by mapping them
	rankUsers := make([]models.RankUser, 0, len(users))
	for i, user := range users {
		rankUsers = append(rankUsers, *user.Rank(i + 1))
	}
	return c.JSON(rankUsers)
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
	var users []models.User
	// we need to get the ranking of the user and the 10 best users
	res = db.Order("karmas desc").Limit(10).Find(&users)
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
	for i, user := range users {
		rankUsers = append(rankUsers, *user.Rank(i + 1))
	}
	return c.JSON(rankUsers)
}
