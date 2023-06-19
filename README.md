# INServices
INService est une plateforme web dédiée aux échanges de services entre étudiants au sein de notre université et de notre campus. Conçue pour promouvoir l'entraide et la coopération, INService offre un espace où les étudiants peuvent offrir leurs compétences, talents et temps en échange de points karma.

---
## Installation
### Prérequis
- [Node.js](https://nodejs.org/en/download/)
- [Golang 1.19](https://golang.org/dl/)

### Installation
- Cloner le projet
#### Sans Docker
- Installer les dépendances pour le frontend
```bash
cd frontend
npm install
```
- Installer les dépendances pour le backend
```bash
cd backend
go mod download
```


#### Avec Docker
- Lancer docker-compose
```bash
docker-compose up
```

## Lancement
#### Sans Docker
- Lancer le frontend
```bash
cd frontend
npm run start
```
- Lancer le backend
```bash
cd backend
go run app.go
```

#### Avec Docker
- Lancer docker-compose
```bash
docker-compose up
```

## Utilisation
- Ouvrir un navigateur et se rendre à l'adresse [http://localhost:80](http://localhost:80)


