package email

import (
	"github.com/flosch/pongo2/v6"
	"github.com/mailjet/mailjet-apiv3-go"
	"inservice/models"
	"log"
)

var templEmailVerifHTML = pongo2.Must(pongo2.FromFile("static/templates/email/email_verification.html"))
var templEmailVerifTxt = pongo2.Must(pongo2.FromFile("static/templates/email/email_verification.txt"))

func SendEmailVerification(client *mailjet.Client, user models.User, token string) error {
	strHTML, err := templEmailVerifHTML.Execute(pongo2.Context{"user": user, "token": token})
	strTxt, err := templEmailVerifTxt.Execute(pongo2.Context{"user": user, "token": token})
	if err != nil {
		return err
	}
	//messagesInfo := []mailjet.InfoMessagesV31{
	//	{
	//		From: &mailjet.RecipientV31{
	//			Email: "no-reply@pollux28.fr",
	//			Name:  "No-Reply INServices",
	//		},
	//		To: &mailjet.RecipientsV31{
	//			mailjet.RecipientV31{
	//				Email: user.Email,
	//				Name:  user.Name + " " + user.Surname,
	//			},
	//		},
	//		Subject:  "Activez votre compte INServices",
	//		TextPart: strTxt,
	//		HTMLPart: strHTML,
	//	},
	//}
	//messages := mailjet.MessagesV31{Info: messagesInfo}
	//res, err := client.SendMailV31(&messages)
	//if err != nil {
	//	return err
	//}
	log.Printf("HTML: %s\n", strHTML)
	log.Printf("TXT: %s\n", strTxt)
	return nil
}
