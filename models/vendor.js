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
    },
    logoImage: {
        type: String, trim: true
    },
    bio: {
        type: String, trim: true
    },
    category: {
        type: String, trim: true
    },
    facebookID: {
        type: String, trim: true
    },
    twitterID: {
        type: String, trim: true
    },
    pintrestID: {
        type: String, trim: true
    },
    linkedinID: {
        type: String, trim: true
    }
});

var vendor = Mongoose.model('vendor', vendorSchema);

module.exports = {
    Vendor: vendor
};
