const userNormalizator = (user) => {
    user = user.toJSON();

    const fieldsToRemove = [
        'password',
        '__v'
    ];

    fieldsToRemove.forEach((field) => {
        delete user[field];
    });

    return user;
};

module.exports = {
    userNormalizator
};
