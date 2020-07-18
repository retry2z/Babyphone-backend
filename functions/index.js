const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./services/authenticate');


//middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


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

app.get('/rooms', auth, list);
app.get('/rooms/:id', auth, details);
app.post('/rooms', auth, post);
app.patch('/rooms/:id', auth, edit);
app.delete('/rooms/:id', auth, remove);

app.get('/rooms/:id/join', auth, join);
app.get('/rooms/:id/leave', auth, leave);


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
} = require('./api/user');

app.get('/user', auth, profile);
app.patch('/user', auth, update);
app.put('/user/password', auth, password);
app.get('/user/logout', auth, logout);
app.get('/user/current', auth, current);



app.all('*', async (req, res) => {
    return res.status(404).json({ message: 'Invalid request nothing found' })
});


exports.api = functions.https.onRequest(app);