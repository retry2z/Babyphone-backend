const { admin } = require('./admin');
const auth = require('./userManagement');

const authenticate = async (request, response, next) => {
    const authHeaders = request.headers.authorization || false;

    if (!authHeaders) {
        request.user = {
            email: '',
            name: 'Anonymous',
            uid: null,
        };

        return next();
    }

    try {
        const [prefix, token] = authHeaders.split(' ');

        if (prefix !== 'Bearer') {
            return response.status(403).json({ error: 'Unauthorized' });
        }

        const verified = await admin.auth().verifyIdToken(token);
        const account = await auth.profile(verified.uid);

        if (!account) {
            return response.status(403).json({ error: 'Unauthorized' });
        }

        request.user = {
            email: account.data.email,
            name: account.data.name,
            uid: account.data.uid,
        };

        return next();
    }
    catch (err) {
        return response.status(403).json({ error: 'Error in token validation', message: err.message });
    }
}

module.exports = authenticate;