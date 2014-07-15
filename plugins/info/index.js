var Joi = require('joi');
var path = require('path');
var Blog = require('../../models/blog').Blog;

exports.register = function(plugin, options, next) {
    plugin.views({
        engines: {
            jade: require('jade')
        },
        path: path.resolve(__dirname, 'templates')
    });
    exports.index(plugin);
    exports.about(plugin);
    exports.location(plugin);

    next();
};

exports.index = function(plugin) {
    var items = {
        title: 'Rolesville Farmers Market',
        pageHeading: 'Welcome'
    };
    plugin.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            Blog.find({}, function(err, res) {
                items.posts = res;
                if (!err) {
                    reply.view('splashpage', items);
                } else {
                    reply(err);
                }
            });
        }
    });
};

exports.about = function(plugin) {
    var items = {
        pageHeading: 'About'
    };
    plugin.route({
        method: 'GET',
        path: '/about',
        handler: function(request, reply) {
            reply.view('about', items);
        }
    });
};


exports.location = function(plugin) {
    var items = {
        pageHeading: '<span class="glyphicon glyphicon-map-marker"></span> Location'
    };
    plugin.route({
        method: 'GET',
        path: '/location',
        handler: function(request, reply) {
            reply.view('location', items);
        }
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};
