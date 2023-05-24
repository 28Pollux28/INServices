project_name = inservice
image_name = inservice_back:latest

run-local:
	go run app.go

requirements:
	go mod tidy

clean-packages:
	go clean -modcache

up: 
	make up-silent
	make shell

build:
	docker build -t $(image_name) .

build-no-cache:
	docker build --no-cache -t $(image_name) .

up-silent:
	make delete-container-if-exist
	docker run -d -p 3000:3000 --name $(project_name) $(image_name) ./app

up-silent-prefork:
	make delete-container-if-exist
	docker run -d -p 3000:3000 --name $(project_name) $(image_name) ./app -prod

delete-container-if-exist:
	docker stop $(project_name) exit 0 && docker rm $(project_name) || exit 0

shell:
	docker exec -it $(project_name) /bin/sh

stop:
	docker stop $(project_name)

start:
	docker start $(project_name)
