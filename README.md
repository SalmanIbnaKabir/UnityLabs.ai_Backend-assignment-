# E-commerce Marketplace API

This project is a simple e-commerce marketplace API built using Express.js and MongoDB with Mongoose. It provides authentication functionality and various endpoints for both buyers and sellers.

### Installation

1. Clone the repository

```bash
git clone https://github.com/SalmanIbnaKabir/UnityLabs.ai_Backend-assignment-
```

2.Install dependencies:

```bash
yarn
```

3. Set up your MongoDB database and update the connection string in index.js.

4. Start the server:

```bash

yarn run dev
```

This Project will Run the following Port : http://localhost:5000/

# API Endpoints

### Auth APIs

```bash
POST /api/auth/register

```

Register a user by providing the following parameters in the request body:

```js
{
  "username": "buyer",
  "password": "123456789",
  "userType": "seller"
}
```

Log in

```bash

POST /api/auth/login
```

Log in a previously registered user and retrieve the authentication token. Provide the following parameters in the request body:

```js
{
  "username": "seller",
  "password": "123456789"

}

```

### APIs for Buyers

Get a list of all sellers

```bash

GET /api/buyer/list-of-sellers
```

Retrieve a list of all sellers in the marketplace.

Get a specific seller's catalog

```bash

GET /api/buyer/seller-catalog/:seller_id
```

Retrieve the catalog of a specific seller by providing the seller_id in the URL.

Create an order for a seller

```bash

POST /api/buyer/create-order/:seller_id
```

Create an order for a seller by providing the seller_id in the URL and a list of items in the request body.

### APIs for Sellers

Create a catalog

```bash
POST /api/seller/create-catalog

```

Create a catalog for a seller by providing a list of items in the request body.

Retrieve orders received

```bash

GET /api/seller/orders
```

Retrieve the list of orders received by a seller.

### Authentication

To access buyer and seller endpoints, you need to include the authentication token in the Authorization header of your HTTP requests. Retrieve the token by logging in using the /api/auth/login endpoint.

Example Usage
Register a new user:

```bash

 POST /api/auth/register
```

```json
{
  "username": "john_doe",
  "password": "password123",
  "type": "buyer"
}
```

Log in to retrieve the authentication token:

```bash

POST /api/auth/login
```

Response:

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdmMDY5YTUyNzQ1MmMyMTYxNThlZTQiLCJpYXQiOjE3MDI4MjM2Mjl9.EiXbG86oES6kfB6UR-SNSb15B1PQxGY9Uu7o-mbAfdE"
}
```

Use the authentication token in the Authorization header for buyer and seller endpoints.

```bash

GET /api/buyer/list-of-sellers
```

Authorization: Bearer your_authentication_token

```bash
POST /api/buyer/create-order/:seller_id
```

Authorization: Bearer your_authentication_token

```json
{
  "products": [
    {
      "name": "Product 1",
      "price": 20.99
    },
    {
      "name": "Product 2",
      "price": 15.49
    }
  ]
}
```

```bash

GET /api/seller/orders
```

Authorization: Bearer your_authentication_token
