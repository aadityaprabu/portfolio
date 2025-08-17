# Name of the docker image
IMAGE_NAME = portfolio-backend

# Default port
PORT = 3000

# Remove old containers & images
clean:
	docker rm -f $$(docker ps -aq) 2>/dev/null || true
	docker rmi -f $$(docker images -q) 2>/dev/null || true
	docker volume prune -f
	docker network prune -f

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the container
run:
	docker run -d -p $(PORT):$(PORT) --name $(IMAGE_NAME) $(IMAGE_NAME)

stop:
	docker stop $(IMAGE_NAME) || true
	docker rm $(IMAGE_NAME) || true

# Rebuild and run
rebuild: stop build run
