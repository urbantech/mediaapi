DB SETUP
=======


NOTE: The below was generated with explain_fail, and it's enough to get the existing implementation up and running, but
there are some things to obect to. I don't like that we're using role 'postgres' and the authentication should be better.
Right now you have to have your DB set up this way, because that's what the generated code expects, and I realize we're
just trying to get things working, but I'd like the config to be better.

Generated setup info:

1. Open a terminal and connect to your PostgreSQL database using the `psql` command.
2. Run the following SQL command to create the "postgres" role:
   ```
   CREATE ROLE postgres WITH LOGIN PASSWORD 'your_password';
   ```
3. Create the database
   ```
   CREATE DATABASE mytestdb;
   ```
3. Grant the necessary privileges to the "postgres" role. For example, you can grant all privileges on all tables in a specific schema using the following command:
   ```
   GRANT ALL PRIVILEGES ON DATABASE mytestdb TO postgres;
   ```
   Replace 'your_password' with the desired password for the role.


