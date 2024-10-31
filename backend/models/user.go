// models/user.go
package models

type User struct {
	ID             uint   `json:"id" gorm:"primaryKey"`
	Name           string `json:"name"`
	NIP            string `json:"nip" gorm:"unique"`
	Email          string `json:"email" gorm:"unique"`
	Password       string `json:"password"`
	Phone          string `json:"phone"`
	Role           string `json:"role"`
	Department     string `json:"department"`
	ProfilePicture string `json:"profile_picture"` // Tambahkan field ini
}
