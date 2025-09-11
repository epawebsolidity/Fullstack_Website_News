package main

import (
	"apk-chat-serve/config"
	"apk-chat-serve/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	config.Connect()
	app := fiber.New()

	// CORS
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// Serve folder utils (untuk file statis seperti gambar)
	app.Static("/utils", "./utils")

	// Setup routes
	routes.Setup(app)

	// Jalankan server di port 5000
	app.Listen(":5000")
}
