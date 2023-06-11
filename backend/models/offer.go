package models

// Offer model
type Offer struct {
	Base
	UserID         uint   `json:"user_id" gorm:"not null"`
	Name           string `json:"title" gorm:"not null"`
	Description    string `json:"description" gorm:"not null"`
	Price          uint   `json:"price" gorm:"not null"`
	Image          string `json:"image" gorm:"default:'default_offer.png'; not null"`
	Visible        bool   `json:"visible" gorm:"default:true; not null;"`
	Status         string `json:"status" gorm:"default:'available'; not null"` // available, accepted, completed
	AcceptedUser   *User  `json:"accepted_user"`
	AcceptedUserID *uint  `json:"accepted_user_id" gorm:"default:null"`
}

// Public offer struct
type PublicOffer struct {
	UserID      uint   `json:"user_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       uint   `json:"price"`
	Image       string `json:"image"`
}

func (offer Offer) Public() PublicOffer {
	return PublicOffer{
		UserID:      offer.UserID,
		Name:        offer.Name,
		Description: offer.Description,
		Price:       offer.Price,
		Image:       offer.Image,
	}
}
