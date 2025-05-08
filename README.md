# CRM_ISM_Group10
Customer Relationship Management Basic for Information System Management 

## Overview



## Prerequisites



## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/uhphuc/crm_ism
cd crm_ism
```

### 2. Install dependencies

Navigate to the `server` and `client` directories and install the required packages:

```bash
# For the server
cd server
npm install

# For the client
cd ../client1
npm install
```

### 3. Create the database

Ensure that you have created the MySQL database as specified in the `.env` file:

```sql
CREATE DATABASE crm_dev;
```
or 
```bash
Select 'Local Instance MySQL80'
In the SCHEMAS click 'right mouse'
Select 'Create Schema' 
Make the name = crm_dev
Then 'Apply' and 'Finish'
```

### 4. Configure environment variables

Create the `.env` file in the `server` directory with the following values:

```properties
DB_HOST=localhost
DB_USER=<your database user>
DB_PASSWORD=<your password>
DB_NAME=crm_dev
JWT_SECRET='your_jwt_secret'
```

> **Note:** Replace `your_secret_here` with your own secure random strings.

> **Note:** Never push the `.env` file to version control. Ensure it is added to `.gitignore`.

### 5. Initialize default roles

Run the `init.js` script to initiate the database and create user admin:

```bash
cd server
node database/init.js
```


### 7. Start the server

Start the server using the following command:

```bash
npm start
```

### 8. Start the client

Navigate to the `client` directory and start the client:

```bash
cd ../client
npm run dev
```


## Usage

- Once the server is running, you can access the API at `http://localhost:3000`.
- The client application will be available at `http://localhost:5173`.

### Testing the Manager Account

- Use the following credentials to log in as the manager:
  - **Email:** `admin@example.com`
  - **Password:** `admin123`

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
