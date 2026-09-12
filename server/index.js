require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const Connection = require('./database/db.js');
const routerAdmin = require('./routes/routeAdmin.js');
const routerProduct = require('./routes/routeProduct.js');
const routerUser = require('./routes/routeUser.js');
const routerCart = require('./routes/routeCart.js');
const routerWishlist = require('./routes/routeWishlist.js');
const routerOrder = require('./routes/routeOrder.js');

const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        // Allow non-browser requests (curl, health checks, server-to-server calls).
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS origin not allowed'));
    },
    credentials: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'e-commerce-api' });
});

app.use('/', routerAdmin);
app.use('/', routerProduct);
app.use('/', routerUser);
app.use('/', routerCart);
app.use('/', routerWishlist);
app.use('/', routerOrder);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
    });
});

const PORT = Number(process.env.PORT) || 8000;

async function startServer() {
    try {
        await Connection();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error.message);
        process.exit(1);
    }
}

startServer();

module.exports = app;
