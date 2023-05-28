package models

// Offer model
type Offer struct {
	Base
	UserID           uint   `json:"user_id" gorm:"not null"`
	OfferName        string `json:"offer_name" gorm:"not null"`
	OfferDescription string `json:"offer_description" gorm:"not null"`
	OfferPrice       uint   `json:"offer_price" gorm:"not null"`
	OfferImage       string `json:"offer_image" gorm:""`
}
