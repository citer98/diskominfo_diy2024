package models

import "time"

type Visitor struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name"`
	Gender      string    `json:"gender"`
	Purpose     string    `json:"purpose"`
	Address     string    `json:"address"`
	Institution string    `json:"institution"`
	Phone       string    `json:"phone"`
	Department  string    `json:"department"`
	VisitDate   time.Time `json:"visitDate"`
}
