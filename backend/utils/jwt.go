package utils

import (
	"errors"
	"log"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

func CreateToken(issuer string, expirationTime time.Time) (string, error) {
	env := goDotEnvVariable("TOKEN_SECRET") // perbaiki typo
	claims := &jwt.StandardClaims{
		ExpiresAt: expirationTime.Unix(),
		Issuer:    issuer,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(env))
}

func ParseToken(tokenStr string) (string, error) {
	env := goDotEnvVariable("TOKEN_SECRET")
	token, err := jwt.ParseWithClaims(tokenStr, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(env), nil
	})

	if err != nil || !token.Valid {
		return "", err
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)
	if !ok {
		return "", errors.New("invalid token claims")
	}

	return claims.Issuer, nil
}

func CreateRefreshToken(issuer string, expirationTime time.Time) (string, error) {
	env := goDotEnvVariable("TOKEN_SECRET_REFRESH")
	claims := &jwt.StandardClaims{
		ExpiresAt: expirationTime.Unix(),
		Issuer:    issuer,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(env))
}

func ParseRefreshToken(tokenString string) (string, error) {
	env := goDotEnvVariable("TOKEN_SECRET_REFRESH")
	token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(env), nil
	})

	if err != nil || !token.Valid {
		return "", err
	}
	claims := token.Claims.(*jwt.StandardClaims) // Casting the token.Claims to the struct jwt.StandardClaims
	return claims.Issuer, nil
}
