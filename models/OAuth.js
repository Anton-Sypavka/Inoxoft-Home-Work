const { Schema, model } = require('mongoose');
const { USER, OAUTH } = require('../configs/dbTables.enum');

const OAuthSchema = new Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(OAUTH, OAuthSchema);
