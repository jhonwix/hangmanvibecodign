#!/bin/bash

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}   Hangman Game - Quick Start${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is running${NC}"
echo ""

# Check if .env files exist
if [ ! -f "./backend/.env" ]; then
    echo -e "${YELLOW}Creating backend .env from example...${NC}"
    cp ./backend/.env.example ./backend/.env
fi

if [ ! -f "./frontend/.env" ]; then
    echo -e "${YELLOW}Creating frontend .env from example...${NC}"
    cp ./frontend/.env.example ./frontend/.env
fi

echo -e "${GREEN}✓ Environment files ready${NC}"
echo ""

# Ask for environment
echo -e "${CYAN}Select environment:${NC}"
echo "1) Development (with hot reload)"
echo "2) Production (optimized build)"
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo -e "${CYAN}Starting development environment...${NC}"
        docker-compose up -d

        echo ""
        echo -e "${GREEN}✓ Development environment started!${NC}"
        echo ""
        echo -e "${YELLOW}Services available at:${NC}"
        echo -e "  Frontend:  ${GREEN}http://localhost:5173${NC}"
        echo -e "  Backend:   ${GREEN}http://localhost:3000${NC}"
        echo -e "  Adminer:   ${GREEN}http://localhost:8080${NC}"
        echo ""
        echo -e "${CYAN}To view logs: ${NC}docker-compose logs -f"
        echo -e "${CYAN}To stop:      ${NC}docker-compose down"
        ;;
    2)
        echo ""
        echo -e "${CYAN}Building production images...${NC}"
        docker-compose -f docker-compose.prod.yml build

        echo ""
        echo -e "${CYAN}Starting production environment...${NC}"
        docker-compose -f docker-compose.prod.yml up -d

        echo ""
        echo -e "${GREEN}✓ Production environment started!${NC}"
        echo ""
        echo -e "${YELLOW}Services available at:${NC}"
        echo -e "  Application: ${GREEN}http://localhost${NC}"
        echo -e "  Backend API: ${GREEN}http://localhost:3000${NC}"
        echo ""
        echo -e "${CYAN}To view logs: ${NC}docker-compose -f docker-compose.prod.yml logs -f"
        echo -e "${CYAN}To stop:      ${NC}docker-compose -f docker-compose.prod.yml down"
        ;;
    *)
        echo -e "${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}   Setup Complete! Happy Gaming! 🎮${NC}"
echo -e "${CYAN}========================================${NC}"
