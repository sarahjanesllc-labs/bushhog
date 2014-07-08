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
        path: '/admin/products',
        handler: function(request, reply) {
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

exports.create = function(plugin) {
    plugin.route({
        method: 'POST',
        path: '/admin/products/add',
        handler: function(request, reply) {
            produce = new Produce();
            produce.label = request.payload.label;
            produce.price = request.payload.price;
            produce.uom = request.payload.uom;
            produce.category = request.payload.category;

            produce.save(function(err) {
                if (!err) {
                    reply(produce).created('/admin/products/' + produce._id);
                } else {
                    reply(err);
                }

            });
        },
        config: {
            auth: 'session'
        }
    });
};


exports.register.attributes = {
    pkg: require('./package.json')
};