package main

import (
	"backend/database"
	"backend/models"
	"backend/routes"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func createInitialAdmin() {
	var user models.User
	result := database.DB.Where("email = ?", "admin@admin.com").First(&user)
	if result.Error != nil {
		// User tidak ditemukan, buat admin baru
		adminUser := models.User{
			Name:       "Admin",
			Email:      "admin@admin.com",
			Password:   "admin123",
			Phone:      "08123456789", // Tambahkan nomor telepon
			Role:       "admin",
			Department: "IT",
		}
		database.DB.Create(&adminUser)
		fmt.Println("Admin user created")
	}
}

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize database
	database.Connect()
	database.DB.AutoMigrate(&models.User{})
	database.DB.AutoMigrate(&models.Department{})
	database.DB.AutoMigrate(&models.Visitor{})
	createInitialAdmin()

	// Initialize Gin router
	router := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true

	// Use CORS middleware
	router.Use(cors.New(config))

	// Setup routes
	routes.SetupRoutes(router)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
