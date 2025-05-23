# CRM_ISM_Group10
Customer Relationship Management Basic for Information System Management 

## Overview

This is a comprehensive CRM system designed to help businesses manage customer interactions, sales pipelines, and team collaboration. The system features user management, customer tracking, and administrative controls with a modern, responsive interface.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/uhphuc/crm_ism.git
cd crm_ism
```

### 2. Install dependencies

Navigate to the `server` and `client1` directories and install the required packages:

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
And in the file `server/config/database.js`

```js
module.exports = {
  development: {
    username: <your_username>, // in your database
    password: <your_password>, // in your database
    database: 'crm_dev', // --> this is the name of our database that we set up before
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: <your_username>, // in your database
    password: <your_password>, // in your database
    database: 'crm_test', // --> this is the name of our database that we set up before
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
```

> **Note:** Replace `your_secret_here` with your own secure random strings.

> **Note:** Never push the `.env` file to version control. Ensure it is added to `.gitignore`.

### 5. Initialize the tables in the database and create a admin account

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
cd ../client1
npm run dev
```

Install Vite for the client in the `client1`

```bash
npm install vite
```

## Usage

- Once the server is running, you can access the API at `http://localhost:3000`.
- The client application will be available at `http://localhost:5173`.

### Testing the Admin Account

- Use the following credentials to log in as the manager:
  - **Email:** `admin@example.com`
  - **Password:** `admin123`
- In this account you can create a sales/manager/support account for this project

### Run the sample database to get a better visual of the project

- Open the `sample_data/sample_data.sql` (copy or take)
- Then paste/take this file into your **MySQL Workbench**
- Query the script `sample_data/sample_data.sql` --> Ctrl + Shift + Enter

### Account information

- All the account for sales/support/manager is automatically set the password is `12345678`
- In the sample data we have:
```bash
admin@example.com --- admin123

manager1@gmail.com --- 12345678
manager2@gmail.com --- 12345678
manager3@gmail.com --- 12345678

sale1@gmail.com --- 12345678
sale2@gmail.com --- 12345678
sale3@gmail.com --- 12345678
sale4@gmail.com --- 12345678
sale5@gmail.com --- 12345678
sale6@gmail.com --- 12345678
sale7@gmail.com --- 12345678
sale8@gmail.com --- 12345678

```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
