package routes

import (
	"apk-chat-serve/controllers"
	middlewares "apk-chat-serve/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(app *fiber.App) {
	app.Post("/api/users/", controllers.SaveUsers)
}

func SetupPrivateUsersRoutes(app *fiber.App) {
	auth := app.Group("/api", middlewares.IsUserAuthenticated)
	auth.Get("/getallusers", controllers.AllUsers)  
}
