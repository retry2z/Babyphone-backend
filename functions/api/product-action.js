const db = require('../services/repository');
const errHandler = require('../utils/errorHandler');


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