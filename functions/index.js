const functions = require('firebase-functions');
const app = require('express')();
const authGuard = require('./services/authGuard');
const authenticate = require('./services/authenticate');


//middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(authenticate);


//product-routes
const {
    list,
    post,
    remove,
    edit,
    details,
    join,
    leave,
} = require('./api/product');

app.get('/rooms', list);
app.get('/rooms/:id', details);
app.post('/rooms', authGuard, post);
app.patch('/rooms/:id', authGuard, edit);
app.delete('/rooms/:id', authGuard, remove);

app.get('/rooms/:id/join', join);
app.get('/rooms/:id/leave', leave);


//auth routes
const {
    login,
    register,
} = require('./api/auth');

app.post('/auth/login', login);
app.post('/auth/register', register);

//user-routes
const {
    logout,
    profile,
    update,
    password,
    current,
    created,
} = require('./api/user');

app.get('/user', authGuard, profile);
app.get('/user/rooms', authGuard, created);
app.patch('/user', authGuard, update);
app.put('/user/password', authGuard, password);
app.get('/user/logout', authGuard, logout);
app.get('/user/current', authGuard, current);



app.all('*', async (req, res) => {
    return res.status(404).json({ message: 'Invalid request nothing found' })
});


exports.api = functions.https.onRequest(app);