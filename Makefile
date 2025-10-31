.PHONY: help dev prod build up down logs clean restart migrate seed test

# Default target
.DEFAULT_GOAL := help

# Colors for output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

## help: Display this help message
help:
	@echo "$(CYAN)Hangman Game - Docker Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Development:$(NC)"
	@echo "  make dev         - Start development environment"
	@echo "  make logs        - View logs from all containers"
	@echo "  make restart     - Restart all containers"
	@echo ""
	@echo "$(GREEN)Production:$(NC)"
	@echo "  make prod        - Start production environment"
	@echo "  make build       - Build production images"
	@echo ""
	@echo "$(GREEN)Database:$(NC)"
	@echo "  make migrate     - Run database migrations"
	@echo "  make seed        - Seed database with initial data"
	@echo ""
	@echo "$(GREEN)Testing:$(NC)"
	@echo "  make test        - Run tests in backend"
	@echo ""
	@echo "$(GREEN)Maintenance:$(NC)"
	@echo "  make down        - Stop all containers"
	@echo "  make clean       - Remove all containers and volumes"
	@echo ""

## dev: Start development environment
dev:
	@echo "$(CYAN)Starting development environment...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Development environment started!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:5173$(NC)"
	@echo "$(YELLOW)Backend API: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Adminer: http://localhost:8080$(NC)"

## prod: Start production environment
prod:
	@echo "$(CYAN)Starting production environment...$(NC)"
	docker-compose -f docker-compose.prod.yml up -d
	@echo "$(GREEN)Production environment started!$(NC)"
	@echo "$(YELLOW)Application: http://localhost$(NC)"
	@echo "$(YELLOW)Backend API: http://localhost:3000$(NC)"

## build: Build production images
build:
	@echo "$(CYAN)Building production images...$(NC)"
	docker-compose -f docker-compose.prod.yml build --no-cache

## up: Start containers
up:
	@echo "$(CYAN)Starting containers...$(NC)"
	docker-compose up -d

## down: Stop all containers
down:
	@echo "$(CYAN)Stopping containers...$(NC)"
	docker-compose down
	docker-compose -f docker-compose.prod.yml down

## logs: View logs from all containers
logs:
	docker-compose logs -f

## clean: Remove all containers, volumes, and images
clean:
	@echo "$(RED)Removing all containers, volumes, and images...$(NC)"
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.prod.yml down -v --rmi all
	@echo "$(GREEN)Cleanup complete!$(NC)"

## restart: Restart all containers
restart:
	@echo "$(CYAN)Restarting containers...$(NC)"
	docker-compose restart
	@echo "$(GREEN)Containers restarted!$(NC)"

## migrate: Run database migrations
migrate:
	@echo "$(CYAN)Running database migrations...$(NC)"
	docker-compose exec backend npm run migrate
	@echo "$(GREEN)Migrations complete!$(NC)"

## seed: Seed database with initial data
seed:
	@echo "$(CYAN)Seeding database...$(NC)"
	docker-compose exec backend npm run seed
	@echo "$(GREEN)Database seeded!$(NC)"

## test: Run tests in backend
test:
	@echo "$(CYAN)Running tests...$(NC)"
	docker-compose exec backend npm test
	@echo "$(GREEN)Tests complete!$(NC)"
