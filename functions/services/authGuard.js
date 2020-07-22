const authGuard = (request, response, next) => {
    const { isAnonymous, uid } = request.user;
    if (isAnonymous || !uid) {
        return response.status(401).json({ error: 'Permission denied' });
    }
    next();
};

module.exports = authGuard;