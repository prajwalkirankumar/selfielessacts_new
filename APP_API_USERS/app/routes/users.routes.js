module.exports = (app) => {
    const acts = require('../controllers/users.controller.js');

    var cors = require('cors');
    app.options('*', cors());
    //Add a user
    app.all('/api/v1/users',acts.addUser);
    //Remove a user
    app.all('/api/v1/users/:username',acts.removeUser);
    //Authenticate a user
    app.all('/api/v1/authenticate/:username',acts.authenticateUser);

};
