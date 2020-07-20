# Basic Authentication Api
This is a simple authentication API made with Expressjs.

I was making the same thing again and again so I decided to make a basic api which I/anyone can reuse later on.

## Things Used:
  - [Expressjs](https://github.com/expressjs/express)
  - [Postgresql for Database](https://www.postgresql.org/)
  - [express-session](https://github.com/expressjs/session)
  - [cookie-parser](https://github.com/expressjs/cookie-parser)
  - [cors](https://github.com/expressjs/cors)
  - [knex](https://github.com/knex/knex)
  - [pg](https://github.com/brianc/node-postgres)
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js/)
  - [nodemon](https://github.com/remy/nodemon)

## Things you need to edit
  - Edit the .env file (PORT and database credentials)
  - Package.json

## How to Use
### 1 - Setup a database in Postgres or any other.
#### SQL to create the same database in psql:
CREATE DATABASE dbname;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  hash VARCHAR(100) NOT NULL
 );
 
### 2 - Change environment variables.
Edit the .env file in project root directory to match Postgres database credentials (username, password, dbname, host:default localhost))

### 3 - Running Node
You should have node and npm installed on your device.
  - Navigate to project directory with temrinal
  - run "npm install"
  - run "npm start"

Great, hopefully everything goes right and you have an API up and running;

## Usage
To test this api you can use Postman (api testing tool used by many devs)

## Routes
### /register
POST request - Requires a JSON body with email, password and name fields

### /login
POST request - Required a JSON body with email, password fields

### /isAuthenticated
GET request - Returns a message if logged in else reuturns an error message with 400 status code

### /logout
GET request - User needs to be logged in. Clears cookies and session data from server.



