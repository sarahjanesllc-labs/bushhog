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
    exports.directions(plugin);

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
                title: 'Rolesville Farmers Market'
            };
            reply.view('splashpage', items);
        }
    });
};

exports.about = function(plugin) {
    plugin.route({
        method: 'GET',
        path: '/about',
        handler: function(request, reply) {
            reply.view('about');
        }
    });
};

exports.directions = function(plugin) {
    plugin.route({
        method: 'GET',
        path: '/directions',
        handler: function(request, reply) {
            reply.view('directions');
        }
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};
