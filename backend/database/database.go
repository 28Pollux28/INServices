package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"inservices/models"
)

// Connect with postgres database
func Connect(dbUrl string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	err = db.AutoMigrate(
		&models.User{},
		&models.Offer{},
		&models.RefreshToken{},
	)
	if err != nil {
		return nil, err
	}
	return db, nil
}
