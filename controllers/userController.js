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
    // Get one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((userData) => 
            !userData
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(userData)
        ) 
        .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
}