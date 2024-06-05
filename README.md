# CondorMarket

## Project Description

**CondorMarket** is a full-fledged e-commerce web application designed to manage products, orders, and customers. This application provides a comprehensive solution for online marketplace management with features like product listing, order management, customer management, and user authentication.

## Features

- **User Authentication**: Secure login and registration with encrypted passwords.
- **Product Management**: Add, edit, delete, and view products with detailed specifications and images.
- **Order Management**: Create, edit, delete, and view orders with detailed information about each order.
- **User Management**: Manage customer details and view customer orders.
- **Responsive Design**: User-friendly interface with Bootstrap components.
- **Protected Routes**: Access control to protect routes and ensure secure operations.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Styling**: CSS, Bootstrap

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB

### Installation

**Clone the repository**

      git clone https://github.com/Nitin2806/CondorMarket-Dashboard.git
      cd CondorMarket-Dashboard
      npm i or npm install

## Running the Application

Start the server

      npm start
      
The server will start on http://localhost:3000.

## Usage

### User Authentication

- **User Authentication**
  - Register: Users can register by providing a username, email, password, and other details.
  - Login: Users can log in using their email and password. Upon successful login, a JWT token is stored in the local storage.

- **Product Management**
  - View Products: List all available products with details like name, description, price, and specifications.
  - Add Product: Add new products with various categories and options.
  - Edit Product: Update product details.
  - Delete Product: Remove products from the list.

- **Order Management**
  - View Orders: List all orders with details like customer information, items, total amount, and status.
  - Add Order: Create new orders with product details and customer information.
  - Edit Order: Update order status and details.
  - Delete Order: Remove orders from the list.

- **User Management**
  - View Users: List all customers with their details.
  - Manage User Orders: View orders placed by each user.


## Project Structure

      CondorMarket-Dashboard/
      ├── public/
      ├── src/
      │   ├── assets/
      │   ├── components/
      │   │   ├──NavBar.js
      │   │   ├──ProtectedRoute.js
      │   ├── pages/
      │   │   ├── AddProduct.js
      │   │   ├── Dashboard.js
      │   │   ├── Login.js
      │   │   ├── NotFound.js
      │   │   ├── OrderDetails.js
      │   │   ├── Orders.js
      │   │   ├── ProductDetails.js
      │   │   ├── Products.js
      │   │   ├── Register.js
      │   │   ├── UserDetails.js
      │   │   ├── Users.js
      │   ├── services/
      │   │   ├──api.js
      │   ├── store/
      │   ├── styles/
      │   ├── App.js
      │   └── index.js
      ├── .env.development 
      ├── .env.development
      ├── .gitignore
      ├── package-lock.json
      ├── package.json
      └── README.md
          
## API Endpoints

- **Product Routes**
  - GET /products: Get all products
  - POST /products: Add a new product
  - GET /products/:id: Get a product by ID
  - PUT /products/:id: Update a product by ID
  - DELETE /products/:id: Delete a product by ID

- **Order Routes**
  - GET /orders: Get all orders
  - POST /orders: Add a new order
  - GET /orders/:id: Get an order by ID
  - PUT /orders/:id: Update an order by ID
  - DELETE /orders/:id: Delete an order by ID

- **User Routes**
  - POST /register: Register a new user
  - POST /login: Login a user