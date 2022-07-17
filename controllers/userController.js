const { User, Thought } = require('../models')

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then(userData => res.json(userData))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
}