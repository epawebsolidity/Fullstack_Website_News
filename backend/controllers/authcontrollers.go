package controllers

import (
	"apk-chat-serve/config"
	"apk-chat-serve/models"
	"apk-chat-serve/utils"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func AUthUsersMiddlaware(c *fiber.Ctx) error {
	loginDto := struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}{}

	if err := c.BodyParser(&loginDto); err != nil {
		return err
	}

	var users models.Users
	result := config.DB.Where("username = ?", loginDto.Username).First(&users)
	if result.RowsAffected > 0 {
		// ✅ Tambah pengecekan status banned
		if users.Status == "Banned" {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"status":  fiber.StatusForbidden,
				"message": "Maaf, akun Anda terkena banned. Silakan hubungi admin.",
			})
		}

		// ✅ Cek password
		if err := bcrypt.CompareHashAndPassword([]byte(users.Password), []byte(loginDto.Password)); err != nil {
			c.Status(fiber.StatusBadRequest)
			return c.JSON(fiber.Map{"message": "Incorrect password !"})
		} else {
			expirationTimeRefresh := time.Now().Add(24 * time.Hour)
			expirationTime := time.Now().Add(6000 * time.Second)
			Token, err := utils.CreateToken(strconv.Itoa(int(users.Id)), expirationTime)
			Refresh, err := utils.CreateRefreshToken(strconv.Itoa(int(users.Id)), expirationTimeRefresh)
			if err != nil {
				return err
			}

			var tokens models.AuthUserTokens
			resultToken := config.DB.Where("user_id = ?", users.Id).First(&tokens)

			if resultToken.RowsAffected < 1 {
				tokenscreate := models.AuthUserTokens{
					AccessToken: Token,
					RefeshToken: Refresh,
					UserId:      users.Id,
				}
				config.DB.Create(&tokenscreate)
			} else {
				tokenscreate := models.AuthUserTokens{
					AccessToken: Token,
					RefeshToken: Refresh,
					UserId:      users.Id,
				}
				config.DB.Model(&tokens).Updates(tokenscreate)
			}

			c.Cookie(&fiber.Cookie{
				Name:     utils.CookieName,
				Value:    Token,
				Path:     "/",
				MaxAge:   30, // 30 detik
				Expires:  time.Now().Add(30 * time.Second),
				Secure:   false,
				HTTPOnly: true,
				SameSite: "lax",
			})

			return c.Status(200).JSON(fiber.Map{
				"status":       200,
				"message":      "Sukses Login, Selamat Menikmati!",
				"AccessToken":  Token,
				"RefreshToken": Refresh,
				"UserId":       users.Id,
			})
		}
	} else {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "Gagal Login Users",
		})
	}
}

func PostRefreshToken(c *fiber.Ctx) error {
	RefToken := struct {
		RefeshToken string `json:"refeshtoken"`
	}{}

	if err := c.BodyParser(&RefToken); err != nil {
		return err
	}
	RefeshTokenServer, err := utils.ParseRefreshToken(RefToken.RefeshToken)
	if err != nil {
		return err
	}
	var token models.AuthUserTokens
	result := config.DB.Where("user_id = ?", RefeshTokenServer).First(&token)
	expirationTimeRefresh := time.Now().Add(24 * time.Hour)
	expirationTime := time.Now().Add(30 * time.Second)
	Token, err := utils.CreateToken(strconv.Itoa(int(token.UserId)), expirationTime)
	Refresh, err := utils.CreateRefreshToken(strconv.Itoa(int(token.UserId)), expirationTimeRefresh)
	if err != nil {
		return err
	}
	if result.RowsAffected > 0 {
		tokenscreate := models.AuthUserTokens{
			AccessToken: Token,
			RefeshToken: Refresh,
			UserId:      token.UserId,
		}
		config.DB.Model(&token).Updates(tokenscreate)
		return c.Status(200).JSON(fiber.Map{
			"status":       200,
			"message":      "successfully refresh token user data",
			"AccessToken":  Token,
			"RefreshToken": Refresh,
		})
	} else {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "failed refresh token users data",
		})
	}
}

func GetUsersLogin(c *fiber.Ctx) error {
	token := c.Get("Authorization")
	if strings.HasPrefix(token, "Bearer ") {
		token = strings.TrimPrefix(token, "Bearer ")
	}

	if token == "" {
		return fiber.NewError(fiber.StatusUnauthorized, "Token tidak ditemukan")
	}

	userIdStr, err := utils.ParseToken(token)
	if err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "Token tidak valid")
	}

	// konversi string ke int
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "User ID tidak valid")
	}

	var users models.Users
	err = config.DB.Preload("Role").First(&users, userId).Error
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "User tidak ditemukan")
	}

	return c.Status(200).JSON(fiber.Map{
		"status":  200,
		"message": "Sukses verify token users data",
		"data":    users,
	})
}

func LogoutAuth(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     utils.CookieName,
		Value:    "",
		Path:     "",
		Domain:   "",
		MaxAge:   0,
		Expires:  time.Now().Add(-(2 * time.Hour)),
		Secure:   false,
		HTTPOnly: true,
		SameSite: "lax",
	})
	return c.JSON(fiber.Map{"message": "Berhasil Logout"})
}
