const { firebase, database } = require('./admin');

const auth = {
    async login(data) {
        try {
            const { email, password } = data;
            return await firebase.auth().signInWithEmailAndPassword(email, password);
        }
        catch (error) {
            if (error.code.includes('auth')) {
                return error;
            }
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async logout() {
        try {
            return await firebase.auth().signOut();
        }
        catch (error) {
            if (error.code.includes('auth')) {
                return error;
            }
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },


    async register(data) {
        try {
            const { email, password } = data;
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            return user = firebase.auth().currentUser;
        }
        catch (error) {
            if (error.code.includes('auth')) {
                return error;
            }
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async currentUser() {
        const user = await firebase.auth().currentUser;

        if (user === null) {
            throw new URIError('Permission denied - No user logged in');
        }

        return user
    },

    async edit(uid, data) {
        try {
            return await database.child(uid).update(data);
        }
        catch (error) {
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async changePassword(data) {
        try {
            return await firebase.auth().currentUser.updatePassword(data);
        }
        catch (error) {
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async observer() {
        const information = () => {
            return new Promise(resolve => {
                firebase.auth().onAuthStateChanged(user => resolve(user));
            });
        }
        return {
            data: await information(),
        }
    },

    async profile(uid) {
        const information = () => {
            return new Promise(resolve => {
                database.once(
                    'value',
                    (snapshot) => {
                        const result = snapshot.val()[uid] || null;
                        resolve(result);
                    },
                    (error) => {
                        throw new URIError('Something went wrong with db ' + error.message);
                    });
            });
        }

        return {
            data: await information(),
        }
    },
}

module.exports = auth;