#!/bin/bash

DB="mydatabase"
COLLECTION="users"
FILE="users.txt"

echo "========== MongoDB Auto Setup =========="

# 1️ Ensure MongoDB is running
if systemctl is-active --quiet mongod; then
  echo "MongoDB is running"
else
  echo "Starting MongoDB..."
  sudo systemctl start mongod
  sleep 5
fi

# 2️ Import data (creates DB & collection automatically)
if [ -f "$FILE" ]; then
  mongoimport --db "$DB" --collection "$COLLECTION" --file "$FILE"
  echo "Data imported successfully"
else
  echo "Data file not found"
fi

echo "Database & Collection created automatically!"
echo "======================================="


 echo "--------------------------------------------------------------------------------"




#!/bin/bash

DB="mydatabase"
COLLECTION="users"
CSV="users.csv"
TXT="users.txt"

echo "MongoDB Auto Setup Started..."

# MongoDB running check
if systemctl is-active --quiet mongod; then
  echo "MongoDB is running"
else
  echo "Starting MongoDB..."
  sudo systemctl start mongod
  sleep 5
fi

# Import CSV
if [ -f "$CSV" ]; then
  echo "Importing CSV..."
  mongoimport --db "$DB" --collection "$COLLECTION" --type csv --headerline --file "$CSV"
fi

# Import TXT
if [ -f "$TXT" ]; then
  echo "Importing TXT..."
  mongoimport --db "$DB" --collection "$COLLECTION" --file "$TXT"
fi

echo "Database & Collection created automatically!"
echo "Import completed!"


mongoimport --db mydatabase --collection users --file users.txt
