package controllers

import (
	"backend/database"
	"backend/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetDepartments(c *gin.Context) {
	var departments []models.Department
	database.DB.Find(&departments)
	c.JSON(http.StatusOK, departments)
}

func GetDepartment(c *gin.Context) {
	id := c.Param("id")

	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Department not found"})
		return
	}

	c.JSON(http.StatusOK, department)
}

func CreateDepartment(c *gin.Context) {
	var department models.Department
	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&department)
	c.JSON(http.StatusCreated, department)
}

func UpdateDepartment(c *gin.Context) {
	id := c.Param("id")
	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Department not found"})
		return
	}

	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Save(&department)
	c.JSON(http.StatusOK, department)
}

func DeleteDepartment(c *gin.Context) {
	id := c.Param("id")
	log.Printf("Attempting to delete department with ID: %s", id)

	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Department not found"})
		return
	}

	if err := database.DB.Delete(&department).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete department"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Department deleted successfully"})
	log.Printf("Department with ID %s deleted successfully", id)
}
