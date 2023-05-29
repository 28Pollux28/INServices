package main

import (
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v2"
	"github.com/joho/godotenv"
	"github.com/mailjet/mailjet-apiv3-go"
	"inservice/database"
	"inservice/handlers"
	"inservice/routes"
	"inservice/utils"

	"flag"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	port = flag.String("port", ":3000", "Port to listen on")
	prod = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {
	// Parse command-line flags
	flag.Parse()
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	// Connected with database
	dbUrl := "host=" + utils.GetEnv("DB_HOST", "localhost") +
		" user=" + utils.GetEnv("DB_USER", "inservices") +
		" password=" + utils.GetEnv("DB_PASSWORD", "inservices") +
		" dbname=" + utils.GetEnv("DB_NAME", "inservices") +
		" port=" + utils.GetEnv("DB_PORT", "5432") +
		" sslmode=disable TimeZone=Europe/Paris"
	db, err := database.Connect(dbUrl)
	if err != nil {
		log.Fatal(err)
	}

	// Create fiber app
	app := fiber.New(fiber.Config{
		Prefork: *prod, // go run app.go -prod
	})
	mailjetClient := mailjet.NewMailjetClient(utils.GetEnv("MAILJET_API_KEY", "azertyuiopmlkjhgfdsq"), utils.GetEnv("MAILJET_API_SECRET", "azertyuiopmlkjhgfdsq123"))

	app.Use(func(c *fiber.Ctx) error {
		c.Locals("db", db)
		c.Locals("mailjet", mailjetClient)
		return c.Next()
	})
	// Middleware
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*, http://localhost",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Create a /api/v1 endpoint
	v1 := app.Group("/api/v1")
	jwtMiddleware := jwtware.New(jwtware.Config{
		SigningKey: []byte("secret"),
	})
	//v1.Post("/refresh", jwtMiddleware, handlers.Refresh)
	// Bind handlers
	routes.UserRoutes(v1, &jwtMiddleware)
	routes.AuthRoutes(v1)

	// Setup static files
	app.Static("/", "./static/public")

	// Handle not founds
	app.Use(handlers.NotFound)

	// Listen on port 3000
	log.Fatal(app.Listen(*port)) // go run app.go -port=:3000
}
