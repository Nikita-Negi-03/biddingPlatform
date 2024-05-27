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




