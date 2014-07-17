var Joi = require('joi');
var path = require('path');
var Blog = require('../../models/blog').Blog;
var User = require('../../models/user').User;

exports.register = function(plugin, options, next) {
    plugin.views({
        engines: {
            jade: require('jade')
        },
        path: path.resolve(__dirname, '../../views')
    });
    exports.index(plugin);
    next();
};

exports.index = function(plugin) {
    var items = {
        pageHeading: 'Administration',
    };
    plugin.route({
        method: 'GET',
        path: '/admin',
        handler: function(request, reply) {
            return reply.view('index', items);
        },
        config: {
            auth: 'session'
        }
    });
};


exports.register.attributes = {
    pkg: require('./package.json')
};
