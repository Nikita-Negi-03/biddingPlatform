MySql setup:- 
1. Open your cmd and go to your \MySql server\bin folder, then run a command ' -u "YOUR_USERNAME" -p '. enter your password. after successfully logging, create a DATABASE "bidding" by running a command ' CREATE DATABASE bidding;' and then run ' Use bidding'.

2. createing table :- 
    create table by running following commands

    USERS -
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

    ITEMS-
    CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    starting_price DECIMAL(10, 2) NOT NULL,
    current_price DECIMAL(10, 2),
    image_url VARCHAR(255),
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


    BIDS-
    CREATE TABLE bids (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    user_id INT,
    bid_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    );

    NOTIFICATIONS-
    CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );

3. Now go the env file of the project and replace DB_USER_NAME, DB_PASSWORD with your username and password respectively.

Now start the project by running ' npm start ' in terminal.



Test cases:- APIs were tested on postman

*user api
case 1: user registration , make a post request using postman on http://localhost:5000/users/register while passing username, email and password, role as parameters in body. Check for the user entry in users table. either by using workbench or cmd.
case 2: user login,  make a post request using postman on http://localhost:5000/users/login while passing username and password as parameters. you will recieve an auth token in response.
case 3: get user profile, make a get request using postman on http://localhost:5000/users/profile, and passing the token recived while logging in Auth as bearer token. in response you will get the user details.

*items api
case 1: GET items http://localhost:5000/items , you will recieve all the items in the items table. you can pass the 'page' and 'limit' in the query to get the pagination with your choice otherwise you will get default pagination of page=1 and limit= 10
case 2: GET 1 item  http://localhost:5000/items/:id you will recive details of 1 single item.
case 3: POST items, http://localhost:5000/items pass token in Auth and details in body using form-data. Check for the product in the items table.
case 4: PUT if you are an admin then you can edit the item details. http://localhost:5000/items/:id use token in Auth to authorize user and pass the details in the body that you want to edit.
case 5: DELETE if you are an admin then you can edelete the item. http://localhost:5000/items/:id use token in Auth to authorize user and pass the details in the body that you want to delete.

*bids api- 
case 1: GET all bids for a specific item. http://localhost:5000/items/:itemId/bids 
case 2: POST Place a new bid on a specific item.  http://localhost:5000/items/:itemId/bids, use Auth token for authorization.

*notification api-
case 1: GET Retrieve notifications for the logged-in user . http://localhost:5000/notifications 
case 2: POST Mark notifications as read. http://localhost:5000/notifications/mark-read. use AUth token for authorization.



