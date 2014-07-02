var Joi = require('joi');
var path = require('path');
var Blog = require('../../models/blog').Blog;

exports.register = function(plugin, options, next) {
    plugin.views({
        engines: { hbs: require('handlebars')},
        path: path.resolve(__dirname, 'templates')
    });
    exports.index(plugin);
    exports.about(plugin);
    exports.location(plugin);

    next();
};

exports.index = function(plugin) {
    plugin.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            var items = {
                posts: Blog.find({}, function(err, items) {
                    if (!err) {
                        return items;
                    } else {
                        return false;
                    }
                }),
                title: 'Rolesville Farmers Market',
                pageHeading: 'Welcome'
            };
            reply.view('splashpage', items);
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
