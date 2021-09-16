const { Schema, model } = require('mongoose');
const { USER, OAUTH, ACTION_TOKEN } = require('../configs/dbTables.enum');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(ACTION_TOKEN, ActionTokenSchema);
