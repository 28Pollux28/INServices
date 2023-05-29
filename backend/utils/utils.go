package utils

import (
	"os"
	"unicode"
)

func GetEnv(key, fallback string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		value = fallback
	}
	return value
}

func CheckPasswordStrength(password string) (isNumber, isUpper, isLower, isSpecial bool) {
	//Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character
	// use the unicode package to check the password
	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			isUpper = true
		case unicode.IsLower(char):
			isLower = true
		case unicode.IsNumber(char):
			isNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			isSpecial = true
		}
	}
	return
}
