#!/bin/bash

# Update pkgs and install docker and docker-compose
apt-get update -y
apt-get install docker.io docker-compose -y
systemctl start docker
systemctl enable docker
usermod -aG docker ${var.admin_username}

# Verify installation
docker info
docker --version
docker-compose --version

# Run the docker-compose file
docker-compose up -d