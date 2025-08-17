IMAGE_NAME = portfolio-backend
PORT = 3000

clean-linux:
	docker rm -f $$(docker ps -aq) 2>/dev/null || true
	docker rmi -f $$(docker images -q) 2>/dev/null || true
	docker volume prune -f
	docker network prune -f

clean-windows:
	-powershell -Command "docker ps -aq | ForEach-Object { docker rm -f $_ }"
	-powershell -Command "docker images -q | ForEach-Object { docker rmi -f $_ }"
	-powershell -Command "docker volume prune -f"
	-powershell -Command "docker network prune -f"

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run --env-file ./app/.env -d -p $(PORT):$(PORT) --name $(IMAGE_NAME) $(IMAGE_NAME) 
stop:
	docker stop $(IMAGE_NAME) || true
	docker rm $(IMAGE_NAME) || true

build-and-run: stop build run
	

