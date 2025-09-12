package controllers

import (
	"apk-chat-serve/config"
	"apk-chat-serve/models"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func SaveNews(c *fiber.Ctx) error {
	titleNews := c.FormValue("title_news")
	tanggalNews := c.FormValue("tanggal_news")
	if tanggalNews == "" {
		tanggalNews = time.Now().Format("2006-01-02 15:04:05")
	}
	newsSource := c.FormValue("news_source")
	newsContent := c.FormValue("news_content")
	category := c.FormValue("category")
	writer := c.FormValue("writer")
	userIdStr := c.FormValue("userid")

	// Convert UserID (string -> uint)
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid user ID",
		})
	}

	// Ambil file upload
	file, err := c.FormFile("news_image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "No image file uploaded",
		})
	}

	// Validasi ukuran file (max 2MB)
	if file.Size > 2*1024*1024 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "File size exceeds 2MB",
		})
	}

	// Validasi ekstensi
	allowedExts := map[string]bool{
		"jpg":  true,
		"jpeg": true,
		"png":  true,
	}
	parts := strings.Split(file.Filename, ".")
	if len(parts) < 2 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid file name",
		})
	}
	fileExt := strings.ToLower(parts[len(parts)-1])
	if !allowedExts[fileExt] {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Unsupported file type",
		})
	}

	// Buat folder otomatis kalau belum ada
	savePath := "./utils/news"
	if _, err := os.Stat(savePath); os.IsNotExist(err) {
		os.MkdirAll(savePath, os.ModePerm)
	}

	// Generate filename unik
	uniqueId := uuid.New()
	filename := strings.Replace(uniqueId.String(), "-", "", -1)
	fileNameToSave := fmt.Sprintf("%s.%s", filename, fileExt)

	// Simpan file
	err = c.SaveFile(file, fmt.Sprintf("%s/%s", savePath, fileNameToSave))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Failed to save file",
		})
	}

	// URL gambar
	baseURL := os.Getenv("BASE_URL") // contoh: http://localhost:5000
	if baseURL == "" {
		baseURL = "http://localhost:5000"
	}
	imageUrl := fmt.Sprintf("%s/utils/news/%s", baseURL, fileNameToSave)

	// Simpan ke DB
	news := models.News{
		Title_News:   titleNews,
		Tanggal_News: tanggalNews,
		News_Source:  newsSource,
		News_Content: newsContent,
		News_Image:   imageUrl,
		Category:     category,
		Writer:       writer,
		UserId:       uint(userId),
	}

	if err := config.DB.Create(&news).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Failed to save news data",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Berhasil menambah data",
		"data":    news,
	})
}

// Get All News (include User)
func AllNews(c *fiber.Ctx) error {
	var news []models.News
	if err := config.DB.Preload("Users").Find(&news).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Failed to fetch news data",
		})
	}
	return c.JSON(fiber.Map{
		"status":  200,
		"message": "Successfully displays all news data",
		"data":    news,
	})
}

// Get News by ID (include User)
func GetIdAllNews(c *fiber.Ctx) error {
	id := c.Params("id")
	var news models.News

	if err := config.DB.Preload("Users").First(&news, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "News not found",
		})
	}

	return c.JSON(fiber.Map{
		"status":  200,
		"message": "Successfully displays news detail",
		"data":    news,
	})
}