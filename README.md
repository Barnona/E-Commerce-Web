# E-Commerce Web

A full-stack e-commerce application built with React, Vite, Node.js, Express and MongoDB. The repository contains three applications:

- `client/` — customer-facing storefront
- `admin/` — administration dashboard
- `server/` — REST API, authentication, products, cart, wishlist, orders, email and Razorpay payment integration

## Project Structure

```text
E-Commerce-Web/
├── client/              # Customer storefront (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
├── admin/               # Admin dashboard (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
├── server/              # Express API + MongoDB
│   ├── config/
│   ├── controller/
│   ├── database/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── index.js
│   └── package.json
└── README.md
```

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- Material UI
- Tailwind CSS
- Swiper

### Backend
- Node.js
- Express 5
- MongoDB / Mongoose
- JWT authentication
- bcryptjs
- Multer for uploads
- Nodemailer for email
- Razorpay for payments
- CORS

## Prerequisites

Install the following before running the project:

- Node.js 20 LTS or newer
- npm
- MongoDB Community Server, MongoDB Atlas, or another MongoDB-compatible deployment
- Git

Check your installation:

```bash
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Barnona/E-Commerce-Web.git
cd E-Commerce-Web
```

Install dependencies separately for each application:

```bash
cd server
npm install

cd ../client
npm install

cd ../admin
npm install
```

## Environment Configuration

Do **not** commit real passwords, API keys, SMTP credentials or database credentials.

Create `server/.env` locally with values appropriate for your environment:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ECommerce
CLIENT_URLS=http://localhost:5173,http://localhost:5174

SMPT_MAIL=your-email@example.com
SMPT_PASSWORD=your-email-app-password

RAZORPAY_KEY_ID=your-razorpay-test-key
RAZORPAY_KEY_SECRET=your-razorpay-test-secret
```

For MongoDB Compass/local MongoDB, the usual development connection is:

```text
mongodb://127.0.0.1:27017/ECommerce
```

Make sure the MongoDB service is running before starting the API.

### Client environment

The client API helper reads `VITE_API_URL`. Create `client/.env.local` when the API is not running on its default local URL:

```env
VITE_API_URL=http://localhost:5000
```

### Admin environment

Configure the admin API base URL through an environment variable instead of hard-coding a production URL. If you use the same local API:

```env
VITE_API_URL=http://localhost:5000
```

## Running the Application

You need three terminal windows during development.

### 1. Start the backend

```bash
cd server
npm run dev
```

The API runs on the port defined by `PORT` (normally `5000`). Check:

```text
http://localhost:5000/health
```

Expected response:

```json
{"status":"ok","service":"e-commerce-api"}
```

### 2. Start the customer frontend

```bash
cd client
npm run dev
```

Vite normally serves the client at:

```text
http://localhost:5173
```

### 3. Start the admin frontend

```bash
cd admin
npm run dev
```

Vite normally assigns another local port if `5173` is already occupied.

## Production Builds

Build the customer frontend:

```bash
cd client
npm run build
npm run preview
```

Build the admin dashboard:

```bash
cd admin
npm run build
npm run preview
```

Start the production API:

```bash
cd server
npm start
```

## API Overview

The backend groups functionality into route modules for:

- Admin authentication and administration
- Products and categories
- User authentication/profile management
- Cart
- Wishlist
- Orders
- Payments

The exact endpoint implementation lives under `server/routes/` and controllers under `server/controller/`.

## Development Workflow

Recommended workflow for future changes:

1. Create a feature branch.
2. Make one logical change at a time.
3. Run the frontend lint/build checks.
4. Run the backend locally and verify `/health`.
5. Test authentication, product, cart, wishlist and order flows affected by the change.
6. Never commit `.env` files containing secrets.
7. Commit with a clear message, for example:

```text
fix: resolve cart quantity update bug
feat: add product filtering
refactor: centralise API configuration
```

## Code Quality Checklist

Before pushing changes:

```bash
cd client
npm run lint
npm run build

cd ../admin
npm run lint
npm run build

cd ../server
npm start
```

Also verify:

- No hard-coded production API URLs in frontend code.
- No credentials or API secrets in source control.
- API errors return useful HTTP status codes.
- Database failures prevent the server from starting in an invalid state.
- User input is validated before database operations.
- Authentication-protected routes verify the user's token.
- Upload directories and generated files are not unnecessarily committed.

## Security Notes

This project handles authentication, email and payment functionality. Before using it in production, add or verify:

- Strong request validation and sanitisation
- Rate limiting for authentication endpoints
- Secure HTTP headers
- Strict production CORS allowlists
- Secure cookie/token handling
- File type/size validation for uploads
- Proper payment signature verification
- Production-grade logging and monitoring
- Secret management through the deployment platform
- Regular dependency updates and vulnerability scanning

## Troubleshooting

### MongoDB connection fails

Check that MongoDB is running and that `MONGO_URI` points to the correct instance.

For local MongoDB:

```text
mongodb://127.0.0.1:27017/ECommerce
```

### CORS error

Add the exact frontend origin to `CLIENT_URLS` in `server/.env`, separated by commas.

### Frontend cannot reach the API

Set:

```env
VITE_API_URL=http://localhost:5000
```

Restart Vite after changing environment variables.

### Payment/email features do not work locally

Configure the required Razorpay and SMTP variables. These services should be tested with test credentials before production use.

## Deployment

The repository is split into independent frontend/admin/backend applications, so each can be deployed separately. Set the appropriate environment variables on the hosting platform and make sure the production frontend origins are included in the backend CORS configuration.

Do not upload `node_modules` or development `.env` files to the repository.

## License

No open-source licence has currently been specified for this repository. Add a licence file if you intend to permit reuse under defined terms.
