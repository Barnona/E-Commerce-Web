# E-Commerce Web

A full-stack e-commerce application built with React, Vite, Node.js, Express and MongoDB.

## Production Deployment

- Customer storefront: https://eshopclient.netlify.app
- Admin dashboard: https://eshopadmindashboard.netlify.app
- Backend API: https://e-commerce-web-d7rw.onrender.com
- Database: MongoDB Atlas

## Project Structure

- `client/` — customer-facing storefront (React + Vite)
- `admin/` — administration dashboard (React + Vite)
- `server/` — Express API, MongoDB, authentication, products, cart, wishlist, orders, email and Razorpay

## Production Environment Variables

### Render — backend

```env
PORT=5000
MONGO_URI=<your-mongodb-atlas-connection-string>
CLIENT_URLS=https://eshopclient.netlify.app,https://eshopadmindashboard.netlify.app
SERVER_URL=https://e-commerce-web-d7rw.onrender.com
ADMIN_URL=https://eshopadmindashboard.netlify.app
SMPT_MAIL=your-email@example.com
SMPT_PASSWORD=your-email-app-password
RAZORPAY_KEY_ID=your-razorpay-test-key
RAZORPAY_KEY_SECRET=your-razorpay-test-secret
JWT_SECRET=<strong-random-secret>
```

### Netlify — customer

```env
VITE_API_URL=https://e-commerce-web-d7rw.onrender.com
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
```

### Netlify — admin

```env
VITE_API_URL=https://e-commerce-web-d7rw.onrender.com
```

`VITE_*` variables are injected during the Vite build, so redeploy each Netlify site after changing them.

## Local Development

Local development may use a local MongoDB instance and Vite/Node development servers. Those local addresses are intentionally not used by the production configuration.

## Production API Health Check

```text
https://e-commerce-web-d7rw.onrender.com/health
```

Expected response:

```json
{"status":"ok","service":"e-commerce-api"}
```

## Security

- Never commit `.env` files containing credentials.
- Keep MongoDB, SMTP, Razorpay and JWT credentials in Render/Netlify environment variables.
- Rotate any credential that was previously exposed in Git history.
- Production CORS is restricted to the deployed Netlify customer and admin origins.

## Important Upload Note

Product/profile uploads currently use the backend `/uploads` directory. Render's local filesystem is not suitable as permanent object storage, so production uploads should eventually be moved to persistent object storage such as Cloudinary or Amazon S3.
