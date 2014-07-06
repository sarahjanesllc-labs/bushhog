var Joi = require('joi');
var path = require('path');
var Produce = require('../../models/produce').Produce;
var Blog = require('../../models/blog').Blog;
var User = require('../../models/user').User;

exports.register = function(plugin, options, next) {
    plugin.views({
        engines: {
            hbs: require('handlebars')
        },
        path: path.resolve(__dirname, 'templates')
    });
    exports.index(plugin);
    exports.products(plugin);
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

exports.products = function(plugin) {
    var items = {
        pageHeading : 'Admin - Products'
    };
    plugin.route({
        method: 'GET',
        path: '/admin/products/{id?}',
        handler: function(request, reply) {
            if (request.params.id) {
                Produce.findById(request.params.id, function(err, data) {
                    items.productDetail = data;
                });
            }
            Produce.find({}, function(err, data) {
                items.products = data;
            });

            return reply.view('products', items);
        },
        config: {
            auth: 'session'
        }
    });
};


exports.register.attributes = {
    pkg: require('./package.json')
};
