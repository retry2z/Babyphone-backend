const db = require('../services/repository');
const Product = require('../models/Product-validation');
const errHandler = require('../utils/errorHandler');


exports.list = async (request, response) => {
    try {
        const data = await db.list('rooms');
        const products = data.docs
            .map((doc) => {
                const item = {
                    ...doc.data()
                }
                return { data: { ...item, id: doc.id, } }
            })
            .filter(x => x);

        return response.json(products);
    } catch (err) {
        errHandler(err, response);
    }
}

exports.post = async (request, response) => {
    const { keyWords, title } = request.body;

    try {
        const item = new Product({ keyWords, title });
        await db.post('rooms', { ...item, author: request.user.uid });

        return response.status(201).json({ data: item });
    } catch (err) {
        errHandler(err, response);
    }
}

exports.remove = async (request, response) => {
    const { id } = request.params;

    try {
        const item = await (await db.get('rooms', id)).data();

        if (item.author !== request.user.uid) {
            return response.status(401).json({ error: 'Permission denied' });
        }

        await db.delete('rooms', id);
        return response.status(200).json({ data: id + ' has been removed' });

    } catch (err) {
        errHandler(err, response);
    }
}

exports.edit = async (request, response) => {
    const { id } = request.params;
    const title = request.body.title || false;
    const keyWords = request.body.keyWords || false;

    try {
        const item = await (await db.get('rooms', id)).data();

        if (item.author !== request.user.uid) {
            return response.status(401).json({ error: 'Permission denied' });
        }

        const temp = {
            title: title ? title : item.title,
            keyWords: keyWords ? keyWords : item.keyWords,
        }

        await db.patch('rooms', id, new Product(temp));
        return response.status(200).json({ data: id + ' has been updated', });
    } catch (err) {
        errHandler(err, response);
    }
}

exports.details = async (request, response) => {
    const { id } = request.params;

    try {
        const item = await (await db.get('rooms', id)).data();

        return response.status(200).json(item);

    } catch (err) {
        errHandler(err, response);
    }
}

exports.join = async (request, response) => {
    const { name, email } = request.user;
    const guest = (name.length) ? name : email;
    const { id } = request.params;

    try {
        const item = await (await db.get('rooms', id)).data();
        item.people.push(guest);

        db.patch('rooms', id, item);


        return response.status(200).json(item);

    } catch (err) {
        errHandler(err, response);
    }
}

exports.leave = async (request, response) => {
    const { name, email } = request.user;
    const guest = (name.length) ? name : email;
    const { id } = request.params;

    try {
        const item = await (await db.get('rooms', id)).data();
        const index = item.people.indexOf(guest);

        if (index >= 0) {
            item.people.splice(index, 1);
        } else {
            return response.status(404).json({ error: 'Something went wrong 404' });
        }

        db.patch('rooms', id, item);

        return response.status(200).json(item);

    } catch (err) {
        errHandler(err, response);
    }
}