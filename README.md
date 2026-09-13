# E-Commerce Web

Full-stack e-commerce application built with React, Vite, Node.js, Express and MongoDB.

## Production Deployment

- Customer storefront: https://eshopclient.netlify.app
- Admin dashboard: https://eshopadmindashboard.netlify.app
- Backend API: https://e-commerce-web-d7rw.onrender.com
- Database: MongoDB Atlas

## Project Structure

```text
E-Commerce-Web/
├── client/              # Customer storefront (React + Vite)
├── admin/               # Administration dashboard (React + Vite)
└── server/              # Express API + MongoDB
```

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Material UI
- Tailwind CSS
- Swiper

### Backend
- Node.js
- Express
- MongoDB / Mongoose
- JWT authentication
- bcryptjs
- Multer
- Nodemailer
- Razorpay
- CORS

## Production Environment Variables

### Render backend
```env
PORT=5000
MONGO_URI=<your-mongodb-atlas-connection-string>
CLIENT_URLS=https://eshopclient.netlify.app,https://eshopadmindashboard.netlify.app
SERVER_URL=https://e-commerce-web-d7rw.onrender.com
ADMIN_URL=https://eshopadmindashboard.netlify.app
SMPT_MAIL=<your-email>
SMPT_PASSWORD=<your-email-app-password>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
JWT_SECRET=<your-long-random-secret>
```

### Netlify customer site
```env
VITE_API_URL=https://e-commerce-web-d7rw.onrender.com
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
```

### Netlify admin site
```env
VITE_API_URL=https://e-commerce-web-d7rw.onrender.com
```

`VITE_*` variables are build-time variables, so redeploy the Netlify site after changing them.

## API Health Check

The deployed API exposes:

```text
https://e-commerce-web-d7rw.onrender.com/health
```

Expected response:

```json
{"status":"ok","service":"e-commerce-api"}
```

## Security

- Never commit `.env` files containing credentials.
- Keep MongoDB, SMTP, Razorpay and JWT credentials in Render/Netlify environment settings.
- Production CORS allows only the deployed customer and admin Netlify origins.
- Rotate any credentials that were previously exposed in Git history.

## Deployment Notes

The customer and admin applications are deployed independently on Netlify and communicate with the Express API deployed on Render. Product and profile image URLs are generated from the Render backend URL.

The Render filesystem used by `server/uploads/` is not persistent across all redeploy/restart scenarios. For production-grade permanent image storage, migrate uploads to an object-storage service such as Cloudinary or Amazon S3.
