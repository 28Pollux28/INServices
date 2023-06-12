package database

import (
	"github.com/glebarez/sqlite"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"inservices/models"
)

// ConnectPostgres with postgres database
func ConnectPostgres(dbUrl string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	err = migrateDB(db)
	if err != nil {
		return nil, err
	}
	return db, nil
}

func migrateDB(db *gorm.DB) error {
	err := db.AutoMigrate(
		&models.User{},
		&models.Offer{},
		&models.RefreshToken{},
	)
	return err
}

// ConnectSqlite with sqlite database
func ConnectSqlite(dbName string) (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	err = migrateDB(db)
	if err != nil {
		return nil, err
	}
	return db, nil
}
