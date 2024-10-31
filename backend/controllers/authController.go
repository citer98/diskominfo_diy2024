// controllers/authController.go
package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Login(c *gin.Context) {
	var input struct {
		Identifier string `json:"identifier"` // Bisa email atau NIP
		Password   string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Tambahkan log untuk melihat nilai identifier
	fmt.Println("Identifier:", input.Identifier)

	var user models.User
	// Coba cari berdasarkan email
	result := database.DB.Where("email = ?", input.Identifier).First(&user)
	if result.Error != nil {
		// Jika tidak ditemukan dengan email, coba cari berdasarkan NIP
		result = database.DB.Where("nip = ?", input.Identifier).First(&user)
		if result.Error != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}
	}

	// Verifikasi password
	if user.Password != input.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate token
	token, err := generateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":         user.ID,
			"name":       user.Name,
			"email":      user.Email,
			"nip":        user.NIP,
			"role":       user.Role,
			"department": user.Department,
		},
	})
}

// Fungsi untuk generate token
func generateToken(user models.User) (string, error) {
	// Create a new token object
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["role"] = user.Role
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Token expires in 24 hours

	// Generate encoded token
	tokenString, err := token.SignedString([]byte("your_secret_key")) // Ganti dengan secret key yang aman
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func Register(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set default role jika tidak ada
	if user.Role == "" {
		user.Role = "user"
	}

	result := database.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}
