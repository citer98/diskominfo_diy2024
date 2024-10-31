package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Fungsi untuk mendapatkan semua visitor
func GetVisitors(c *gin.Context) {
	var visitors []models.Visitor

	// Mengambil data untuk tahun ini
	currentYear := time.Now().Year()
	startOfYear := time.Date(currentYear, 1, 1, 0, 0, 0, 0, time.UTC)

	if err := database.DB.Where("visit_date >= ?", startOfYear).Find(&visitors).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

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

	// Set visit date if not provided
	if visitor.VisitDate.IsZero() {
		visitor.VisitDate = time.Now()
	}

	// Debug print
	fmt.Printf("Creating visitor with date: %v\n", visitor.VisitDate)

	if err := database.DB.Create(&visitor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

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
