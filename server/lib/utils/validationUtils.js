//const Bcrypt = require('bcrypt');

module.exports = {
	validate : function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

// server.auth.strategy('simple', 'basic', { validateFunc: validate });
}
