require('dotenv').config();
const express = require('express');
const app = express();
const Connection = require('./database/db.js');
const routerAdmin = require('./routes/routeAdmin.js');
const routerProduct = require('./routes/routeProduct.js')
const routerUser = require('./routes/routeUser.js')
const routerCart = require('./routes/routeCart.js');
const routerWishlist = require('./routes/routeWishlist.js')
const routerOrder = require('./routes/routeOrder.js')
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174",
        "https://e-shop-es5i.onrender.com",
        "https://your-admin-app.vercel.app"
    ],
    credentials: true
}));
Connection();

app.use(bodyParser.json( { extended : true } ));
app.use(bodyParser.urlencoded( { extended : true } ));

app.use('/uploads', express.static('uploads'));

app.use('/', routerAdmin);
app.use('/', routerProduct)
app.use('/', routerUser)
app.use('/', routerCart);
app.use("/", routerWishlist);
app.use("/", routerOrder);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Running On Port Number ${PORT}`));
