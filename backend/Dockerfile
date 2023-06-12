# Building the binary of the App
FROM golang:1.19 AS build

WORKDIR /go/src/inservices

# Copy all the Code and stuff to compile everything
COPY . .

# Downloads all the dependencies in advance (could be left out, but it's more clear this way)
RUN go mod download

# Builds the application as a staticly linked one, to allow it to run on alpine
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o app .


# Moving the binary to the 'final Image' to make it smaller
FROM alpine:3.18.0 as release

WORKDIR /app

# Create the `public` dir and copy all the assets into it
RUN mkdir ./static
RUN mkdir ./uploads

COPY ./static ./static
COPY ./default_avatar200.png ./uploads/users/200/default_avatar200.png
COPY ./default_avatar50.png ./uploads/users/50/default_avatar50.png

COPY --from=build /go/src/inservice/app .
ENV DB_HOST="postgres"
ENV DB_PORT="5432"
ENV DB_USER="inservices"
ENV DB_PASSWORD="inservices"
ENV DB_NAME="inservices"
ENV DB_DRIVER="sqlite"
ENV JWT_SECRET="secret"

# Add packages
RUN apk -U upgrade \
    && apk add --no-cache dumb-init ca-certificates \
    && chmod +x /app/app \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /var/log/*

# Exposes port 3000 because our program listens on that port
EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]