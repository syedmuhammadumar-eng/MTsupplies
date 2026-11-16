# MT Supplies - E-Commerce Store

A full-stack e-commerce web application for **MT Supplies**, built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with **Stripe** for secure online payments.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Stripe Setup](#stripe-setup)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Payment Flow](#payment-flow)
- [Testing Payments](#testing-payments)
- [Deployment](#deployment)
- [Security](#security)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Customer
- Browse products by category, search, filter, and sort
- Product detail pages with images, description, price, and stock status
- Shopping cart (add, update quantity, remove)
- User registration, login, and profile management
- Secure checkout with **Stripe** (credit/debit cards)
- Order history and order status tracking
- Saved shipping addresses
- Email confirmation after successful payment

### Admin
- Dashboard with sales, orders, and customer statistics
- Product management (create, edit, delete, upload images)
- Category and inventory management
- Order management (update status: processing, shipped, delivered, cancelled)
- Refund handling through Stripe
- User management

### General
- JWT authentication with role-based access (customer / admin)
- Stripe webhooks for reliable payment confirmation
- Responsive design for mobile and desktop
- Centralized error handling and input validation

---

## Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | React, React Router, Context API / Redux, Axios, Tailwind CSS |
| Backend    | Node.js, Express.js                                 |
| Database   | MongoDB, Mongoose                                   |
| Payments   | Stripe (Checkout / Payment Intents, Webhooks)       |
| Auth       | JWT, bcryptjs                                       |
| Images     | Cloudinary or Multer (local storage)                |
| Tools      | Nodemon, dotenv, CORS, Stripe CLI, Postman          |

---

## Project Structure

```
mt-supplies/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── stripe.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── webhookController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── webhookRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   └── admin/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Stripe account](https://dashboard.stripe.com/register)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (for testing webhooks locally)
- Git

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mt-supplies.git
   cd mt-supplies
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/mt_supplies
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# Email (optional, for order confirmations)
EMAIL_HOST=smtp.example.com
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
```

> **Never commit `.env` files or your Stripe secret key.** Add `.env` to `.gitignore`.

---

## Stripe Setup

1. Create an account at [stripe.com](https://stripe.com) and switch to **Test mode**.
2. Go to **Developers → API keys** and copy your **Publishable key** and **Secret key** into the `.env` files.
3. Install and log in to the Stripe CLI:

   ```bash
   stripe login
   ```

4. Forward webhook events to your local server:

   ```bash
   stripe listen --forward-to localhost:5000/api/webhook
   ```

5. Copy the **webhook signing secret** (`whsec_...`) printed by the CLI into `STRIPE_WEBHOOK_SECRET`.

For production, create a webhook endpoint in the Stripe Dashboard (**Developers → Webhooks**) pointing to `https://your-domain.com/api/webhook`, and subscribe to:

- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

---

## Running the App

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm start
```

**Stripe webhook listener** (separate terminal)

```bash
stripe listen --forward-to localhost:5000/api/webhook
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## API Endpoints

### Auth

| Method | Endpoint             | Description        | Access  |
|--------|----------------------|--------------------|---------|
| POST   | `/api/auth/register` | Register user      | Public  |
| POST   | `/api/auth/login`    | Login              | Public  |
| GET    | `/api/auth/me`       | Current user       | Private |

### Products

| Method | Endpoint              | Description                  | Access |
|--------|-----------------------|------------------------------|--------|
| GET    | `/api/products`       | List products (search/filter)| Public |
| GET    | `/api/products/:id`   | Product details              | Public |
| POST   | `/api/products`       | Create product               | Admin  |
| PUT    | `/api/products/:id`   | Update product               | Admin  |
| DELETE | `/api/products/:id`   | Delete product               | Admin  |

### Orders

| Method | Endpoint                  | Description              | Access  |
|--------|---------------------------|--------------------------|---------|
| POST   | `/api/orders`             | Create order (pending)   | Private |
| GET    | `/api/orders/my-orders`   | Logged-in user's orders  | Private |
| GET    | `/api/orders/:id`         | Order details            | Private |
| GET    | `/api/orders`             | All orders               | Admin   |
| PUT    | `/api/orders/:id/status`  | Update order status      | Admin   |

### Payments

| Method | Endpoint                          | Description                          | Access  |
|--------|-----------------------------------|--------------------------------------|---------|
| POST   | `/api/payment/create-checkout-session` | Create Stripe Checkout session  | Private |
| POST   | `/api/webhook`                    | Stripe webhook receiver              | Stripe  |
| POST   | `/api/payment/refund/:orderId`    | Refund an order                      | Admin   |

> Protected routes require: `Authorization: Bearer <token>`
>
> The webhook route must receive the **raw request body** (use `express.raw({ type: 'application/json' })`) so Stripe signature verification works.

---

## Database Models

### User

```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "customer" | "admin",
  addresses: [{ street, city, state, postalCode, country }],
  createdAt: Date
}
```

### Product

```js
{
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  stock: Number,
  ratings: Number,
  createdAt: Date
}
```

### Order

```js
{
  user: ObjectId (ref: User),
  items: [{ product: ObjectId, name, price, quantity }],
  shippingAddress: { street, city, state, postalCode, country },
  totalPrice: Number,
  paymentStatus: "pending" | "paid" | "failed" | "refunded",
  stripeSessionId: String,
  stripePaymentIntentId: String,
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled",
  paidAt: Date,
  createdAt: Date
}
```

---

## Payment Flow

1. Customer adds items to the cart and proceeds to checkout.
2. The frontend calls `POST /api/payment/create-checkout-session` with the cart items and shipping address.
3. The backend validates prices and stock **from the database** (never trust prices sent from the client), creates a pending order, and creates a Stripe Checkout Session.
4. The customer is redirected to Stripe's hosted checkout page to pay.
5. After payment, Stripe redirects the customer to the success page and sends a `checkout.session.completed` webhook to the backend.
6. The webhook handler verifies the signature, marks the order as **paid**, reduces product stock, and sends a confirmation email.
7. If payment fails or the session expires, the order stays pending or is marked failed.

---

## Testing Payments

Use Stripe's test cards in Test mode (any future expiry date, any CVC, any postal code):

| Scenario              | Card Number           |
|-----------------------|-----------------------|
| Successful payment    | `4242 4242 4242 4242` |
| Payment declined      | `4000 0000 0000 0002` |
| Requires 3D Secure    | `4000 0025 0000 3155` |

More test cards: [stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## Deployment

- **Frontend:** Vercel, Netlify
- **Backend:** Render, Railway, Heroku, or a VPS
- **Database:** MongoDB Atlas

Before going live:

- Switch Stripe to **Live mode** and replace the test keys with live keys
- Register the production webhook endpoint in the Stripe Dashboard
- Set `NODE_ENV=production` and update `CLIENT_URL`
- Serve the site over HTTPS

---

## Security

- Passwords hashed with bcrypt
- JWT-based authentication and role-based authorization
- Card data is handled entirely by Stripe; it never touches your server
- Stripe webhook signature verification
- Server-side price and stock validation
- Input validation and sanitization
- CORS restricted to the frontend URL
- Secrets stored only in environment variables

---

## Future Improvements

- Discount codes and coupons
- Product reviews and ratings
- Wishlist
- Multiple payment methods (Apple Pay, Google Pay, local wallets)
- Stripe Tax and shipping rate calculation
- PDF invoices
- Inventory low-stock alerts
- Order tracking with courier integration

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

**MT Supplies**
Email: your-email@example.com
GitHub: [@your-username](https://github.com/your-username)
