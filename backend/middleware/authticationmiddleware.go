package middlewares

import (
	"apk-chat-serve/config"
	"apk-chat-serve/models"
	"apk-chat-serve/utils"
	"log"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func IsUserAuthenticated(ctx *fiber.Ctx) error {
	tokenString := ctx.Get("Authorization")
	cookieToken := ctx.Cookies(utils.CookieName)

	log.Println("Authorization header:", tokenString)
	log.Println("Cookie token:", cookieToken)

	if strings.HasPrefix(tokenString, "Bearer ") {
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	} else if cookieToken != "" {
		tokenString = cookieToken
	}

	if tokenString == "" {
		log.Println("No token found in header or cookie")
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "fail",
			"message": "You are not logged in",
		})
	}

	userIDStr, err := utils.ParseToken(tokenString)
	if err != nil {
		log.Println("ParseToken error:", err)
		return fiber.ErrUnauthorized
	}

	idInt, err := strconv.Atoi(userIDStr)
	if err != nil {
		log.Println("Invalid user ID format in token:", userIDStr)
		return fiber.ErrUnauthorized
	}

	var user models.Users
	result := config.DB.Where("id = ?", idInt).First(&user)
	if result.Error != nil {
		log.Println("User not found or DB error:", result.Error)
		return fiber.ErrUnauthorized
	}

	log.Println("User authenticated:", user.Username)
	ctx.Locals("user", user)

	return ctx.Next()
}
