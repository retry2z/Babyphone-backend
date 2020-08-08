const auth = require('../services/userManagement');
const Account = require('../models/Account-validation');
const errHandler = require('../utils/errorHandler');
const db = require('../services/repository');

exports.profile = async (request, response) => {
    try {
        const user = await auth.profile(request.user.uid);

        return response.status(200).json(user.data);

    } catch (err) {
        errHandler(err, response);
    }
}

exports.update = async (request, response) => {
    const { name, imageUrl } = request.body;

    try {
        const { data } = await auth.profile(request.user.uid);

        const temp = {
            name: name ? name : data.name,
            imageUrl: imageUrl ? imageUrl : data.imageUrl,
        }
        await auth.edit(request.user.uid, new Account(temp));

        const user = await auth.profile(request.user.uid);

        return response.status(200).json({ message: 'Updated successfully', data: user.data });

    } catch (err) {
        errHandler(err, response);
    }
}

exports.password = async (request, response) => {
    const { password, newPassword, rePassword } = request.body;

    if (newPassword !== rePassword) {
        return response.status(400).json({ message: 'Passwords are not equals' });
    }

    try {
        await auth.changePassword(rePassword);

        return response.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        errHandler(err, response);
    }
}

exports.logout = async (request, response) => {
    try {
        await auth.logout();

        return response.status(200).json({ message: 'Logout successfully' });

    } catch (err) {
        errHandler(err, response);
    }
}

exports.current = async (request, response) => {
    try {
        const user = await auth.currentUser();

        return response.status(200).json(user);

    } catch (err) {
        errHandler(err, response);
    }
}


exports.created = async (request, response) => {
    try {
        const data = await db.list('rooms');
        const products = data.docs
            .map((doc) => {
                if (doc.data().author === request.user.uid) {
                    return { ...doc.data(), id: doc.id }
                }
            })
            .filter(x => x);

        return response.json(products);

    } catch (err) {
        errHandler(err, response);
    }
}