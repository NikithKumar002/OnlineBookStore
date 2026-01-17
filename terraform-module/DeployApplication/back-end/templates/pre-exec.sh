#!/bin/bash

ACR_NAME="$1"
ADMIN_USER="$2"

# Check if Azure-Cli is installed
if ! command -v az &> /dev/null; then
    echo "Azure CLI not found. Installing..."
    curl -sL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null
    AZ_REPO=$(lsb_release -cs)
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | sudo tee /etc/apt/sources.list.d/azure-cli.list
    sudo apt-get update -y
    sudo apt-get install azure-cli -y
else
    echo "Azure CLI already installed."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo apt-get update -y
    sudo apt-get install docker.io -y
else
    echo "Docker already installed."
fi

# Start and enable docker service
systemctl start docker
systemctl enable docker

# Add admin user to docker group
usermod -aG docker ${ADMIN_USER}

# Azure login
az login --identity
az acr login --name ${ACR_NAME}

# Run the docker-compose file
cd /home/$ADMIN_USER/templates
docker-compose up -d