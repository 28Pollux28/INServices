package utils

import (
	"bytes"
	"github.com/disintegration/imaging"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"image"
	"io"
	"log"
	"mime/multipart"
	"net/http"
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

func ExtractImageFromForm(c *fiber.Ctx, formField string, size int64) (string, *image.Image, error) {
	file, err := c.FormFile(formField)
	if err != nil {
		return "", nil, err
	}
	// check file size
	if file.Size > size {
		return "", nil, fiber.NewError(fiber.StatusBadRequest, "File too big")
	}

	uuidS, err := uuid.NewRandom()
	if err != nil {
		return "", nil, err
	}
	fName := uuidS.String()

	// check if file is an image
	open, err := file.Open()
	if err != nil {
		return "", nil, err
	}
	defer func(open multipart.File) {
		err := open.Close()
		if err != nil {
			log.Println(err)
		}
	}(open)
	buff := make([]byte, 512) // docs tell that it take only first 512 bytes into consideration
	if _, err = open.Read(buff); err != nil {
		return "", nil, err
	}
	_, err = open.Seek(0, io.SeekStart)
	if err != nil {
		return "", nil, err
	}
	contentType := http.DetectContentType(buff)
	if contentType != "image/jpeg" && contentType != "image/png" {
		return "", nil, fiber.NewError(fiber.StatusBadRequest, "Invalid file type")
	}
	// resize image
	buffer, err := io.ReadAll(open)
	if err != nil {
		return "", nil, err
	}

	// resize image
	img, err := imaging.Decode(bytes.NewReader(buffer))
	if err != nil {
		return "", nil, err
	}
	return fName, &img, nil
}
