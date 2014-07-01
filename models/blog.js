// blog model
var Mongoose = require('mongoose');

var blogSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    md: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    images: [{
        type: String, trim: true
    }]
});

var blog = Mongoose.model('blog', blogSchema);

module.exports = {
    Blog: blog
};
