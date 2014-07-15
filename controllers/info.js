var Blog = require('../models/blog').Blog;
module.exports = {};

module.exports.index = function(req, reply) {
    var items = {
        title: 'Rolesville Farmers Market',
        pageHeading: 'Welcome'
    };

    Blog.find({}, function(err, res) {
        items.posts = res;
        if (!err) {
            reply.view('views/info/splashpage', items);
        } else {
            reply(err);
        }
    });
};

module.exports.about = function(req, reply) {
    var items = {
        pageHeading: 'About'
    };
    reply.view('views/info/about', items);
};


module.exports.location = function(req, reply) {
    var items = {
        pageHeading: '<span class="glyphicon glyphicon-map-marker"></span> Location'
    };
    reply.view('views/info/location', items);
};
