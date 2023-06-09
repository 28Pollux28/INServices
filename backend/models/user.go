package models

// User model
type User struct {
	Base
	Name          string  `json:"name" gorm:"not null"`
	Surname       string  `json:"surname" gorm:"not null"`
	Username      string  `gorm:"unique" json:"username"`
	Password      string  `gorm:"not null" json:"password"`
	Email         string  `gorm:"unique" json:"email"`
	Phone         string  `gorm:"unique" json:"phone"`
	EmailVerified bool    `gorm:"default:false" json:"email_verified"`
	Karmas        int     `gorm:"default:20" json:"karmas"`
	Avatar        string  `json:"avatar" gorm:"default:default_avatar.png"`
	Offers        []Offer `gorm:"foreignkey:UserID"`
	RefreshTokens []RefreshToken
}

// Public user struct
type PublicUser struct {
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Username string `json:"username"`
	Avatar   string `json:"avatar"`
}

// Private user struct
type PrivateUser struct {
	Name          string `json:"name"`
	Surname       string `json:"surname"`
	Username      string `json:"username"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	EmailVerified bool   `json:"email_verified"`
	Karmas        int    `json:"karmas"`
	Avatar        string `json:"avatar"`
}

func (u *User) Public() *PublicUser {
	return &PublicUser{
		Name:     u.Name,
		Surname:  u.Surname,
		Username: u.Username,
		Avatar:   u.Avatar,
	}
}

func (u *User) Private() *PrivateUser {
	return &PrivateUser{
		Name:          u.Name,
		Surname:       u.Surname,
		Username:      u.Username,
		Email:         u.Email,
		Phone:         u.Phone,
		EmailVerified: u.EmailVerified,
		Karmas:        u.Karmas,
		Avatar:        u.Avatar,
	}
}
