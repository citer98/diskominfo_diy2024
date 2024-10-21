package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func VisitorRoutes(router *gin.RouterGroup) {
	router.GET("/visitors", middleware.AuthMiddleware(), controllers.GetVisitors)
	router.GET("/visitors/:id", middleware.AuthMiddleware(), controllers.GetVisitor) // Tambahkan endpoint ini jika belum ada
	router.POST("/visitors", controllers.CreateVisitor)
	router.PUT("/visitors/:id", controllers.UpdateVisitor) // Pastikan ada endpoint untuk update visitor
	router.DELETE("/visitors/:id", middleware.AuthMiddleware(), controllers.DeleteVisitor)
}
