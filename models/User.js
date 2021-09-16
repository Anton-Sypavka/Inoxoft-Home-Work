const { Schema, model } = require('mongoose');

const { USER } = require('../configs/dbTables.enum');

const userRolesEnum = require('../configs/userRoles');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
});

module.exports = model(USER, userSchema);
