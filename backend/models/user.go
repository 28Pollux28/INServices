package models

// User model
type User struct {
	Base
	Name          string `json:"name" gorm:"not null"`
	Surname       string `json:"surname" gorm:"not null"`
	Username      string `gorm:"unique, not null" json:"username"`
	Password      string `gorm:"not null" json:"password"`
	Email         string `gorm:"unique, not null" json:"email"`
	Phone         string `gorm:"unique" json:"phone"`
	EmailVerified bool   `gorm:"default:false" json:"email_verified"`
	Offers        []Offer
	RefreshTokens []RefreshToken
}

// Public user struct
type PublicUser struct {
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Username string `json:"username"`
}

// Private user struct
type PrivateUser struct {
	Name          string `json:"name"`
	Surname       string `json:"surname"`
	Username      string `json:"username"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	EmailVerified bool   `json:"email_verified"`
}

func (u *User) Public() *PublicUser {
	return &PublicUser{
		Name:     u.Name,
		Surname:  u.Surname,
		Username: u.Username,
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
	}
}
