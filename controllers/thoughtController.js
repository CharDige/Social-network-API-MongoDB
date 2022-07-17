const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
}