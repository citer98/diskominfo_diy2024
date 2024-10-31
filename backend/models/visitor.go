package models

import "time"

// models/visitor.go
type Visitor struct {
	ID          uint      `json:"id" gorm:"primary_key"`
	Name        string    `json:"name"`
	Gender      string    `json:"gender"`
	Purpose     string    `json:"purpose"`
	Address     string    `json:"address"`
	Institution string    `json:"institution"`
	Phone       string    `json:"phone"`
	Department  string    `json:"department"`
	VisitDate   time.Time `json:"visit_date"`
	CreatedAt   time.Time `json:"created_at"`
}
