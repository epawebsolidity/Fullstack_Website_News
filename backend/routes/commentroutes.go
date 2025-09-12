package routes

import (
	"apk-chat-serve/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupCommentRoutes(app *fiber.App) {
	app.Post("/api/news/comment/", controllers.CreateComment)
	app.Get("/api/news/comment/:id", controllers.GetNewsIdComment)
}
