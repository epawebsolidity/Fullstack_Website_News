package controllers

import (
	"apk-chat-serve/config"
	"apk-chat-serve/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetNewsIdComment(c *fiber.Ctx) error {
    newsID := c.Params("id")

    var news models.News

    if err := config.DB.
		Preload("Users"). // penulis berita
		Preload("Comments", func(db *gorm.DB) *gorm.DB {
			return db.Order("comments.id DESC") // urutkan komentar terbaru dulu
		}).
		Preload("Comments.Users"). // preload user yang komentar
		First(&news, newsID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"status":  404,
			"message": "Berita tidak ditemukan",
			"error":   err.Error(),
		})
	}


    return c.JSON(fiber.Map{
        "status":  200,
        "message": "Berhasil ambil detail berita + komentar + user",
        "data":    news,
    })
}

func CreateComment(c *fiber.Ctx) error {
	// Struct untuk menerima input
	var input struct {
		Comment_News string `json:"comment_news"`
		Date_Comment string `json:"date_comment"`
		Time         string `json:"time"`
		News_Id      string `json:"newsId"`
		UserId       string `json:"usersId"`
	}

	// Parsing body JSON
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "Gagal parsing data",
			"error":   err.Error(),
		})
	}

	// Konversi string ke uint
	newsID, err := strconv.ParseUint(input.News_Id, 10, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "News_Id harus berupa angka",
		})
	}

	userID, err := strconv.ParseUint(input.UserId, 10, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  400,
			"message": "UserId harus berupa angka",
		})
	}

	// Simpan ke struct model
	comment := models.Comment{
		Comment_News: input.Comment_News,
		Date_Comment: input.Date_Comment,
		Time:         input.Time,
		News_Id:      uint(newsID),
		UserId:       uint(userID),
	}

	// Simpan ke database
	if err := config.DB.Create(&comment).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  500,
			"message": "Gagal menyimpan komentar",
			"error":   err.Error(),
		})
	}

	// Respon sukses
	return c.Status(200).JSON(fiber.Map{
		"status":  200,
		"message": "Komentar berhasil disimpan",
		"data":    comment,
	})
}




