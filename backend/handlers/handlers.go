package handlers

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type ValidateErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New()

// NotFound returns custom 404 page
func NotFound(c *fiber.Ctx) error {
	return c.Status(404).JSON(fiber.Map{
		"success": false,
		"message": "Sorry, Not Found!",
	})
}
