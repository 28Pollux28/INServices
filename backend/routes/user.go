package routes

import (
	"github.com/gofiber/fiber/v2"
	"inservices/handlers"
)

func UserRoutes(router fiber.Router, jwtMiddleware *fiber.Handler) {
	user := router.Group("/user")
	public := user.Group("/public")
	public.Post("/:id", handlers.GetPubUser)
	public.Get("/rankings", handlers.GetPubRanking)
	restricted := user.Group("/restricted", *jwtMiddleware)
	restricted.Post("/avatar", handlers.UploadUserAvatar)
	restricted.Get("/rankings", handlers.GetPrivRanking)
	restricted.Get("/me", handlers.GetPrivUser)
}
