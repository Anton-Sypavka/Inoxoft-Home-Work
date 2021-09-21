const { Schema, model } = require('mongoose');
const { USER } = require('../configs/userRoles');
const { PRODUCT } = require('../configs/dbTables.enum');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(PRODUCT, ProductSchema);
