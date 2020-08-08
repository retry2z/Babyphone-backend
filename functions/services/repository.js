const { firestore } = require('./admin');

const db = {
    async post(collection, data) {
        try {
            return await firestore.collection(collection).add({ ...data });
        }
        catch (error) {
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async list(collection) {
        try {
            return await firestore.collection(collection).get();
        }
        catch (error) {
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async get(collection, id) {
        try {
            return await firestore.collection(collection).doc(id).get();
        }
        catch (error) {
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async patch(collection, id, data) {
        try {
            return await firestore.collection(collection).doc(id).update(data);
        }
        catch (error) {
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },

    async delete(collection, id) {
        try {
            return await firestore.collection(collection).doc(id).delete();
        }
        catch (error) {
            throw new URIError('Something went wrong with db ' + error.message);
        }
    },
}


module.exports = db;