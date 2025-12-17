#!/bin/bash

echo " Updating system..."
sudo apt update -y && sudo apt upgrade -y

echo "Installing required packages..."
sudo apt install -y curl gnupg software-properties-common

# -------------------------------
# Install Node.js (LTS)
# -------------------------------
echo " Installing Node.js LTS..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

echo "Node version:"
node -v
echo "NPM version:"
npm -v

# -------------------------------
# Install MongoDB
# -------------------------------
echo " Installing MongoDB..."

curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt update -y
sudo apt install -y mongodb-org

sudo systemctl start mongod
sudo systemctl enable mongod

echo "MongoDB status:"
sudo systemctl status mongod --no-pager

# -------------------------------
# Install Express, Mongoose, Nodemon
# -------------------------------
echo " Creating sample Node project..."
mkdir mern-app && cd mern-app

npm init -y

echo " Installing Express & Mongoose..."
npm install express mongoose

echo " Installing Nodemon (global)..."
sudo npm install -g nodemon

echo "Installation Completed Successfully!"



#!/bin/bash

echo " Vite + React Frontend Setup"

# -------------------------------
# Check Node.js
# -------------------------------
if ! command -v node &> /dev/null
then
  echo " Node.js is not installed. Install Node.js first."
  exit 1
fi

echo " Node version:"
node -v
echo "NPM version:"
npm -v

# -------------------------------
# Create Vite + React App
# -------------------------------
echo " Creating Vite + React project..."
npm create vite@latest frontend -- --template react

cd frontend || exit

# -------------------------------
# Install dependencies
# -------------------------------
echo " Installing React Router, Axios, Tailwind CSS..."
npm install react-router-dom axios tailwindcss @tailwindcss/vite

# -------------------------------
# Initialize Tailwind
# -------------------------------
echo " Initializing Tailwind CSS..."
npx tailwindcss init -p

# -------------------------------
# Finish
# -------------------------------
echo " Setup completed successfully!"
echo " Next steps:"
echo " cd frontend"
echo "   npm run dev"
