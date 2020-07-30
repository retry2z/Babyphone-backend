const auth = require('../services/userManagement');
const Account = require('../models/Account-validation');
const errHandler = require('../utils/errorHandler');
const { database } = require('../services/admin');

exports.login = async (request, response) => {
    const temp = {
        email: request.body.email,
        password: request.body.password
    }

    try {
        const { user, code } = await auth.login(temp);

        if (!user) {
            return response.status(401).json({ code, error: 'Invalid email or password' });
        }

        return response.status(200)
            .header("Authorization", await user.getIdToken())
            .send({ message: 'Login successfully', code, token: await user.getIdToken() });

    } catch (err) {
        errHandler(err, response);
    }
}

exports.register = async (request, response) => {
    const { password, rePassword } = request.body;

    if (password !== rePassword) {
        return response.status(400).json({ message: 'Passwords are not equals' });
    }

    try {
        const account = new Account(request.body);
        const temp = await auth.register({ email: account.email, password: account.password });

        if (!temp.uid) {
            return response.status(401).json({ error: 'Invalid email or password' });
        }

        const token = await temp.getIdToken();
        const user = {
            uid: temp.uid,
            email: account.email,
            name: account.name || '',
            imageUrl: account.imageUrl || '',
            createdAt: account.createdAt || new Date().toISOString(),
        }
        await database.child(user.uid).set(user);

        return response.status(201)
            .header("Authorization", token)
            .send({ message: 'Registration successfully', token });

    } catch (err) {
        errHandler(err, response);
    }
}
