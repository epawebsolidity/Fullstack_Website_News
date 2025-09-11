package routes

import (
	"apk-chat-serve/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupNewsRoutes(app *fiber.App) {
	app.Post("/api/news/", controllers.SaveNews)
	app.Get("/api/news/:id", controllers.GetIdAllNews)
	app.Get("/api/news/", controllers.AllNews)
}
