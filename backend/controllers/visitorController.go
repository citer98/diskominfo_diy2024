package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Fungsi untuk mendapatkan semua visitor
func GetVisitors(c *gin.Context) {
	var visitors []models.Visitor
	database.DB.Find(&visitors)
	c.JSON(http.StatusOK, visitors)
}

func GetVisitor(c *gin.Context) {
	// Ambil ID dari parameter URL
	id := c.Param("id")

	var visitor models.Visitor
	// Cari visitor berdasarkan ID
	if err := database.DB.First(&visitor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Visitor not found"})
		return
	}

	// Kembalikan data visitor
	c.JSON(http.StatusOK, visitor)
}

func CreateVisitor(c *gin.Context) {
	var visitor models.Visitor
	if err := c.ShouldBindJSON(&visitor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Log data yang diterima
	fmt.Printf("Received visitor data: %+v\n", visitor)
	database.DB.Create(&visitor)
	c.JSON(http.StatusCreated, visitor)
}

func DeleteVisitor(c *gin.Context) {
	id := c.Param("id")

	var visitor models.Visitor
	if err := database.DB.First(&visitor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Visitor not found"})
		return
	}

	if err := database.DB.Delete(&visitor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete visitor"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Visitor deleted successfully"})
}

func UpdateVisitor(c *gin.Context) {
	id := c.Param("id")
	var visitor models.Visitor
	if err := database.DB.First(&visitor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Visitor not found"})
		return
	}
	if err := c.ShouldBindJSON(&visitor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Save(&visitor)
	c.JSON(http.StatusOK, visitor)
}
