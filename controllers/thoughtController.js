const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions')
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a thought that's attached to a user
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
        })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Update a thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.statu(404).json({ message: 'No thought with this ID!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
}