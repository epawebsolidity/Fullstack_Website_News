package routes

import (
	"apk-chat-serve/controllers"
	middlewares "apk-chat-serve/middleware"

	"github.com/gofiber/fiber/v2"
)

// Public routes (tidak butuh auth middleware)
func SetupPublicAuthRoutes(app *fiber.App) {
	app.Post("/api/refresh-token", controllers.PostRefreshToken)
	app.Post("/api/login", controllers.AUthUsersMiddlaware)
}

// Private routes (butuh auth middleware)
func SetupAuthRoutes(app *fiber.App) {
	auth := app.Group("/api", middlewares.IsUserAuthenticated)
	auth.Post("/home", controllers.GetUsersLogin)
	auth.Post("/logout", controllers.LogoutAuth)
}
