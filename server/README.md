# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `yarn i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `yarn start` command

# flows
1/ POST /auth/login with json 
{ 
    username 
    password
}
 ==> get jwt 

2/ for protected routes include the header 

{
    auth: jwtToken 
}

3/ /users
    GET all users
    POST create new user
4/ /users/id
    GET 
    PATCH update a user
    DELETE
5/ /users/self
    GET 
6/ /feedbacks
    GET 
    POST
7/ /feedbacks/id
    PATCH
    DELETE
8/ /feedbacks/self
    GET self feedbacks

# Assumption
- if user got deleted, his associated feedback will be deleted

# encountered issue 
1/ Client does not support authentication protocol requested by server; consider upgrading MySQL client
==> run: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
2/ ER_NO_SUCH_TABLE: Table 'test.user' doesn't exist after run the migration
==> it is because u need to start backend before can run migration