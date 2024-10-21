package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Di sini Anda bisa menambahkan logika otentikasi
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// Jika token valid, lanjutkan ke handler berikutnya
		c.Next()
	}
}
