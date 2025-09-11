package models

import "golang.org/x/crypto/bcrypt"

type Users struct {
	Id       uint   `gorm:"primaryKey" json:"id"`
	Username string `gorm:"type:varchar(80);unique" form:"username" binding:"required"`
	No_Ktp   string `gorm:"type:varchar(80);unique" form:"no_ktp" binding:"required"`
	Email    string `gorm:"type:varchar(80);unique" form:"email" binding:"required"`
	Password []byte `gorm:"not null" json:"password"`
	IdRole   uint   `gorm:"column:id_role;not null" json:"roleId"`
	Status   string `gorm:"type:varchar(80)" form:"status" binding:"required"`
	Bio      string `gorm:"type:varchar(80)" form:"bio"`
	Role     Role   `gorm:"foreignKey:IdRole"`
	// Relasi balik ke News (opsional)
	News []News `json:"news" gorm:"foreignKey:UserId"`
}

type Role struct {
	Id   uint   `gorm:"primaryKey" json:"id"`
	Role string `gorm:"type:varchar(80)"`
}

type AuthUserTokens struct {
	Id          uint   `gorm:"primaryKey" json:"id"`
	AccessToken string `gorm:"type:varchar(350);" form:"access_token" binding:"required"`
	RefeshToken string `gorm:"type:varchar(350);" form:"refesh_token" binding:"required"`
	UserId      uint   `gorm:"not null" json:"usersId"`
	Users       Users  `gorm:"foreignKey:UserId"`
}

type News struct {
	Id           uint   `gorm:"primaryKey" json:"id"`
	Title_News   string `gorm:"type:varchar(80)"`
	Tanggal_News string `gorm:"type:varchar(80)"`
	News_Source  string `gorm:"type:varchar(80)"`
	News_Content string `gorm:"type:text"`
	News_Image   string `gorm:"type:varchar(80)"`
	Category     string `gorm:"type:varchar(80)"`
	Writer       string `gorm:"type:varchar(80)"`
	Status       string `gorm:"type:varchar(80)"`
	UserId       uint   `gorm:"not null" json:"usersId"`
	Users        Users  `json:"user" gorm:"foreignKey:UserId;references:Id"`
}

func (users *Users) SetPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return err
	}
	users.Password = hashedPassword
	return nil
}

func (users *Users) VerifyPassword(password string) error {
	return bcrypt.CompareHashAndPassword(users.Password, []byte(password))
}
