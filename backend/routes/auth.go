package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
	"inservice/handlers"
	"inservice/models"
	"inservice/utils"
	"time"
)

func AuthRoutes(router fiber.Router) {
	auth := router.Group("/auth")
	auth.Post("/login", handlers.Login)
	auth.Post("/register", handlers.Register)
	auth.Post("/refresh", handlers.Refresh)
	auth.Post("/verify", handlers.VerifyEmail)
	auth.Post("/clean", func(c *fiber.Ctx) error {
		// Fetch all tokens
		db := c.Locals("db").(*gorm.DB)
		var tokens []models.RefreshToken
		db.Find(&tokens)
		// Delete expired tokens
		for _, token := range tokens {
			parse, err := jwt.Parse(token.Token, func(token *jwt.Token) (interface{}, error) {
				return []byte(utils.GetEnv("JWT_SECRET", "secret")), nil
			})
			if err != nil {
				continue
			}
			// If token is expired, delete it
			cl := parse.Claims.(jwt.MapClaims)
			if !cl.VerifyExpiresAt(time.Now().Unix(), true) {
				db.Delete(&token)
			}

		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "success",
		})
	})
}
