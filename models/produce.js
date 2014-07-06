// produce model
var Mongoose = require('mongoose');

var produceSchema = new Mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    uom: [{
        unit: { // each, pound, bushel
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        onHand: { // Inventory
            type: Number,
            required: true
        }
    }], // unit of measure

    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    image: {
        type: String, trim: true
    }
});

var produce = Mongoose.model('produce', produceSchema);

module.exports = {
    Produce: produce
};
