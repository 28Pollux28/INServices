package routes

import (
	"github.com/gofiber/fiber/v2"
	"inservices/handlers"
)

func OffersRoutes(router fiber.Router, jwtMiddleware *fiber.Handler) {
	offer := router.Group("/offers")
	public := offer.Group("/public")
	public.Get("/latest", handlers.GetLatestPubOffers)
	public.Get("/byUser/:id", handlers.GetPubOffersByUser)
	public.Get("/:id", handlers.GetPubOfferByID)
	restricted := offer.Group("/restricted", *jwtMiddleware)
	restricted.Post("/create", handlers.CreateOffer)
	restricted.Post("/edit/:id", handlers.EditOffer)
	restricted.Post("/delete/:id", handlers.DeleteOffer)
	restricted.Get("/my", handlers.GetMyOffers)
	restricted.Get("/my/:id", handlers.GetMyOfferByID)
	restricted.Post("/accept/:id", handlers.AcceptOffer)
	restricted.Post("/cancel/:id", handlers.CancelOffer)
	restricted.Post("/complete/:id", handlers.CompleteOffer)
}
