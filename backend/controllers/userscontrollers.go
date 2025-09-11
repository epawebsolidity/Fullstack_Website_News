package controllers

import (
	"apk-chat-serve/config"
	"apk-chat-serve/models"
	"apk-chat-serve/utils"
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

var validWilayah = map[string]string{
	"360408": "Pulo Ampel, Serang, Banten",
}

func validateKTP(nik string) (bool, string) {
	nik = strings.TrimSpace(nik) // <-- Trim spasi di awal dan akhir

	fmt.Println("Validating NIK:", nik)

	if len(nik) != 16 {
		fmt.Println("Gagal: panjang bukan 16")
		return false, ""
	}

	matched, _ := regexp.MatchString(`^\d{16}$`, nik)
	if !matched {
		fmt.Println("Gagal: bukan angka semua")
		return false, ""
	}

	kodeWilayah := nik[:6]
	namaWilayah, exists := validWilayah[kodeWilayah]
	if !exists {
		fmt.Println("Gagal: kode wilayah tidak ditemukan:", kodeWilayah)
		return false, ""
	}

	tgl := nik[6:8]
	bln := nik[8:10]
	thn := nik[10:12]

	day, _ := strconv.Atoi(tgl)
	month, _ := strconv.Atoi(bln)
	year, _ := strconv.Atoi(thn)

	if day > 40 {
		day -= 40
	}

	fullYear := 1900 + year
	if fullYear < 1950 {
		fullYear += 100
	}

	dobStr := fmt.Sprintf("%04d-%02d-%02d", fullYear, month, day)
	fmt.Println("Tanggal lahir:", dobStr)

	_, err := time.Parse("2006-01-02", dobStr)
	if err != nil {
		fmt.Println("Gagal: format tanggal lahir tidak valid")
		return false, ""
	}

	return true, namaWilayah
}

func SaveUsers(c *fiber.Ctx) error {
	CreateUsers := struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
		No_Ktp   string `json:"no_ktp"`
	}{}

	if err := c.BodyParser(&CreateUsers); err != nil {
		return err
	}

	// Pastikan role id = 2 ada di database
	var role models.Role
	if err := config.DB.First(&role, 2).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "Role default (id=2) tidak ditemukan",
		})
	}

	// Validasi NIK
	isValid, wilayah := validateKTP(CreateUsers.No_Ktp)
	if !isValid {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "No KTP tidak valid",
		})
	}

	if CreateUsers.No_Ktp[:6] != "360408" {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "Hanya warga Pulo Ampel yang diperbolehkan mendaftar",
		})
	}

	// Simpan user dengan role default = 2
	users := models.Users{
		Username: CreateUsers.Username,
		Email:    CreateUsers.Email,
		No_Ktp:   CreateUsers.No_Ktp,
		IdRole:   2,
		Status:   "Active",
	}

	users.SetPassword(CreateUsers.Password)
	result := config.DB.Create(&users)
	if result.Error != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "failed to add user data",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"status":  200,
		"message": "Berhasil menyimpan data user",
		"data":    users,
		"wilayah": wilayah,
	})
}

func AllUsers(c *fiber.Ctx) error {
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

    userId, err := strconv.Atoi(userIdStr)
    if err != nil {
        return fiber.NewError(fiber.StatusUnauthorized, fmt.Sprintf("User ID %s tidak valid", userIdStr))
    }

    var users []models.Users
    config.DB.Preload("Role").Find(&users)

    return c.JSON(fiber.Map{
        "status":  200,
        "message": "successfully displays user data",
        "data":    users,
        "userId":  userId, // kalau mau kirim balik userId juga
    })
}
