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
        .select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
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
    // Update a user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user by ID and deleting associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this ID!' })
                : Thought.deleteMany(
                    { username: user.username }
                )
                    .then((deletedUser) => 
                        !deletedUser
                            ? res.status(404).json({ message : 'Thoughts of user not deleted ' })
                            : res.json(deletedUser)
                    )
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a friend to a user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove friend from a user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};