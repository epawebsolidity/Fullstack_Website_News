package routes

import (
	middlewares "apk-chat-serve/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	SetupUserRoutes(app)
	SetupPublicAuthRoutes(app)
	SetupNewsRoutes(app)
	SetupCommentRoutes(app)
	app.Use(middlewares.IsUserAuthenticated)
	SetupAuthRoutes(app)
	SetupPrivateUsersRoutes(app)
}
