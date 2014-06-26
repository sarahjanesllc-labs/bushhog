// user model
var Mongoose = require('mongoose');

var userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    paypal_client: {
        type: String
    },
    paypal_client_secret: {
        type: String
    },
    paypal_refresh_token: {
        type: String
    }
});

var user = Mongoose.model('user', userSchema);

module.exports = {
    User: user
};
