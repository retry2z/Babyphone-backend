const errHandler = (err, res) => {
    if (err instanceof SyntaxError) {
        return res.status(500).send({ error: 'Invalid data information syntax' });
    }

    if (err instanceof URIError) {
        return res.status(500).send({ error: 'Something went wrong with your credentials. Please try again.' });
    }

    if (err instanceof TypeError) {
        return res.status(400).send({ error: err.message });
    }

    return res.status(500).send({ error: 'Something went wrong', msg: err.message });
};

module.exports = errHandler;