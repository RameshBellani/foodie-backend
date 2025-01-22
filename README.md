# Food Ordering API

This API allows users to manage their profiles, place orders, and track them efficiently.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [User Profile](#user-profile)
  - [Menu](#menu)
  - [Orders](#orders)
- [Middleware](#middleware)
- [Models](#models)
- [Usage](#usage)
- [License](#license)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/food-ordering-api.git
   cd food-ordering-api

Install dependencies:

npm install

start the server:

node server.js

Environment Variables
Create a .env file in the root directory and configure the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


API Endpoints
User Authentication
1. Register User
Endpoint: POST /api/users/register
Description: Create a new user.

Request Body:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "1234567890"
}


Response:
{
  "message": "User registered successfully",
  "token": "your_jwt_token"
}


2. Login User
Endpoint: POST /api/users/login
Description: Authenticate user and get a token.

Request Body:

{
  "email": "john.doe@example.com",
  "password": "password123"
}


Response:

{
  "message": "Login successful",
  "token": "your_jwt_token"
}


User Profile
3. Get User Profile
Endpoint: GET /api/users/profile
Headers: Authorization: Bearer <your_token>
Description: Fetch logged-in user's profile.

Response:

{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "addresses": []
}


4. Update User Profile
Endpoint: PUT /api/users/profile
Headers: Authorization: Bearer <your_token>
Description: Update user profile details.

Request Body:

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "addresses": [
    {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    }
  ]
}


Response:
{
  "message": "Profile updated successfully",
  "user": { ... }
}


Menu
5. Get Menu Items
Endpoint: GET /api/menu
Description: Fetch all available menu items.

Response:

[
  {
    "_id": "menu_id",
    "name": "Spicy Chicken Wings",
    "description": "Crispy wings with spicy sauce",
    "price": 299.99,
    "image": "https://example.com/wings.jpg",
    "category": "Appetizers",
    "available": true,
    "rating": 4.2
  }
]


Orders
6. Create Order
Endpoint: POST /api/orders
Headers: Authorization: Bearer <your_token>
Description: Place a new order.

Request Body:

{
  "items": [
    {
      "menuItem": "menu_id",
      "quantity": 2
    }
  ],
  "total": 599.98,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "paymentMethod": "card"
}


Response:

{
  "message": "Order placed successfully",
  "order": { ... }
}


7. Get Order History
Endpoint: GET /api/orders
Headers: Authorization: Bearer <your_token>
Description: Retrieve all past orders of the logged-in user.

Response:

[
  {
    "_id": "order_id",
    "items": [
      {
        "menuItem": "menu_id",
        "quantity": 2
      }
    ],
    "total": 599.98,
    "status": "pending",
    "paymentMethod": "card"
  }
]



8. Update Order Status (Admin Only)
Endpoint: PUT /api/orders/:id/status
Headers: Authorization: Bearer <admin_token>
Description: Update the status of an order.

Request Body:

{
  "status": "delivered"
}

Response:

{
  "message": "Order status updated successfully"
}


Middleware
Authentication Middleware (protect.js)
Protects routes by verifying JWT tokens.

Admin Middleware (admin.js)
Ensures that only admin users can access certain routes.

Models
User Model (models/User.js)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [{ street: String, city: String, state: String, zipCode: String }]
});

module.exports = mongoose.model('User', userSchema);
Order Model (models/Order.js)

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ menuItem: String, quantity: Number }],
  total: Number,
  status: { type: String, enum: ['pending', 'delivered'], default: 'pending' },
  paymentMethod: String
});

module.exports = mongoose.model('Order', orderSchema);
Usage
Register a new user with /api/users/register
Login to get a JWT token with /api/users/login
Use the token in Authorization header to access protected routes
Place an order using /api/orders
View order history and track order status
License
This project is licensed under the MIT License.

You can copy and paste this into your `README.md` file directly. Let me know if you'd like any changes!






