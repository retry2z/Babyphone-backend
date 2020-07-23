const functions = require('firebase-functions');
const app = require('express')();

const cors = require('./utils/cors');
const authGuard = require('./services/authGuard');
const authenticate = require('./services/authenticate');


//middleware
app.use(cors);
app.use(authenticate);


//product-routes
const productModule = require('./routes/product');
app.use('/rooms', productModule);


//product action routes
const productActionsModule = require('./routes/product-actions');
app.use('/rooms', productActionsModule);


//auth routes
const authModule = require('./routes/auth');
app.use('/auth', authModule);

//user-routes
const userModule = require('./routes/user');
app.use('/user', userModule);


//not-found
app.all('*', async (req, res) => {
    return res.status(404).json({ message: 'Invalid request nothing found' })
});


exports.api = functions.https.onRequest(app);