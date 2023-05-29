package routes

import (
	"github.com/gofiber/fiber/v2"
	"inservice/handlers"
)

func UserRoutes(router fiber.Router, jwtMiddleware *fiber.Handler) {
	user := router.Group("/user")
	public := user.Group("/public")
	public.Post("/login", handlers.Login)

	restricted := user.Group("/restricted", *jwtMiddleware)
	restricted.Get("/profile", handlers.Login)
}
