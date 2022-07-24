# Adding the database
1. download and install Postgres https://www.postgresql.org/download/
    - the user postgres should have no password
2. create the database and table for the project
    - change to directory /server
    - execute the command ```psql -f database.sql -U postgres```
3. execute the command ```npm i express pg cors``` in /

the database is now added

# Nice to have - productivity
- pgAdmin for overview of the database
- Postman (API Test tool) https://www.postman.com
    - this makes it easy to write data from the body (JSON format) to the database using POST http://localhost:3001/projects and reading data from the database using GET
    - update, delete, read a specific project use PUT, DELETE and GET http://localhost:3001/projects/:id

# Inserting in the database
1. start the server in / with ```node server/index.js```
2. send something via postman in json-format
3. insertion is done, have a look in the table e.g. with ```psql```