package models

// Offer model
type Offer struct {
	Base
	UserID      uint   `json:"user_id"`
	Name        string `json:"title"`
	Description string `json:"description"`
	Price       uint   `json:"price"`
	Image       string `json:"image"`
	Visible     bool   `json:"visible" gorm:"default:true"`
	Status      string `json:"status" gorm:"default:'available';"` // available, accepted, completed

	AcceptedUserID uint `json:"accepted_user_id" gorm:"null"`
}
