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







 echo "--------------------------------------------------------------------------------"




echo "automation script "



echo "frontend url"
http://localhost:5173/
http://localhost:5173/login
http://localhost:5173/register

STEP-2
1.create a working folder
mkdir mongo_auto
cd mongo_auto



2.CREATE DATA FILE(TXT-JSON)
nano users.txt

3.THEN  COPY PASTE  IT 
{"username":"kumar01","name":"Kumar","email":"kumar@gmail.com","age":25}
{"username":"suresh01","name":"Suresh","email":"suresh@gmail.com","age":30}

Save → CTRL+O → ENTER → CTRL+X




4.CREATE AUTOMATION SCRIPT
nano auto_mongo.sh

after copy paste it 

#!/bin/bash

DB="mydatabase"
COLLECTION="users"
FILE="users.txt"

echo "======================================="
echo " MongoDB FULL AUTOMATION SCRIPT "
echo "======================================="

# 1️⃣ Check MongoDB status
if systemctl is-active --quiet mongod; then
    echo "MongoDB is running"
else
    echo "Starting MongoDB..."
    sudo systemctl start mongod
    sleep 5
fi

# 2️⃣ Import data (AUTO creates DB & Collection)
if [ -f "$FILE" ]; then
    mongoimport --db "$DB" --collection "$COLLECTION" --file "$FILE"
    echo "Data imported successfully"
else
    echo "ERROR: Data file not found!"
    exit 1
fi

echo "Database & Collection created automatically!"
echo "======================================="




5.RUN THE AUTOMATION
chmod +x auto_mongo.sh
./auto_mongo.sh



6.VERIFY THE PROOF
mongosh




7.GO TO DATABASE AND SEE THE COLLECTION AND DATA

show dbs
use mydatabase
show collections
db.users.find().pretty()



#MongoDB creates database and collection ONLY when data is inserted
mongoimport --db mydatabase --collection users --file users.txt