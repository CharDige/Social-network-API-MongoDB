const { Schema, model } = require('mongoose');
const moment = require('moment');

// Schema for reactions
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => moment(createdAtValue).format('DD MMMM YYYY, h:mm a'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);