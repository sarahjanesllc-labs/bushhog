// vendor model
var Mongoose = require('mongoose');

var vendorSchema = new Mongoose.Schema({
    vendorname: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var vendor = Mongoose.model('vendor', vendorSchema);

module.exports = {
    Vendor: vendor
};
