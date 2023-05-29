package models

type RefreshToken struct {
	Base
	Token  string `json:"token" gorm:"type:text;not null"`
	UserId uint   `json:"user_id" gorm:"not null"`
}
