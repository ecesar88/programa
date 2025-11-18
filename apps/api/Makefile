# API Docker Management Makefile

.PHONY: help build up down logs clean restart status shell-db shell-api migrate seed

# Build and run services
build: ## Build the Docker images
	docker-compose build

up: ## Start all services in detached mode
	docker-compose up -d

up-build: ## Build and start all services
	docker-compose up -d --build

# Stop and cleanup
down: ## Stop and remove all containers
	docker-compose down


# View logs
logs: ## Show logs for all services
	docker-compose logs -f

logs-api: ## Show logs for kitchen_manager service only
	docker-compose logs -f kitchen_manager

logs-db: ## Show logs for PostgreSQL service only
	docker-compose logs -f postgres

# Database management
migrate: ## Run Prisma migrations
	docker-compose exec kitchen_manager pnpm prisma migrate deploy

migrate-dev: ## Create and apply a new migration
	docker-compose exec kitchen_manager pnpm prisma migrate dev

seed: ## Seed the database
	docker-compose exec kitchen_manager pnpm prisma db seed

# Cleanup
clean: ## Remove all containers, networks, and volumes
	docker-compose down -v --remove-orphans
	docker system prune -f

# Development workflow
dev: up logs ## Start development environment and show logs

setup: ## Initial setup (build, up, migrate, seed)
	@echo "Setting up development environment..."
	$(MAKE) build
	$(MAKE) up
	@echo "Waiting for database to be ready..."
	@sleep 10
	$(MAKE) migrate
	$(MAKE) seed
	@echo "Setup complete! API is running at http://localhost:3000"
