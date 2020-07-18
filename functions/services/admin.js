const config = require('../config/config');

const admin = require('firebase-admin');
admin.initializeApp();

//Firebase Firestore
const firestore = admin.firestore();


const db = admin.database();
const database = db.ref('/users');

const firebase = require('firebase');
firebase.initializeApp(config);

module.exports = { firestore, database, firebase, admin };