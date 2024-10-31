package controllers

import (
	"backend/database" // Gantilah sesuai dengan struktur folder Anda
	"backend/models"   // Gantilah sesuai dengan struktur folder Anda

	"github.com/gin-gonic/gin"
)

func GetStats(c *gin.Context) {
	var totalUsers int64
	var totalDepartments int64

	database.DB.Model(&models.User{}).Count(&totalUsers)
	database.DB.Model(&models.Department{}).Count(&totalDepartments)

	c.JSON(200, gin.H{
		"totalUsers":       totalUsers,
		"totalDepartments": totalDepartments,
	})
}
