var Joi = require('joi');
var path = require('path');
var Blog = require('../../models/blog').Blog;
var User = require('../../models/user').User;

exports.register = function API(plugin, options, next) {
    /*
     * user api
     */
    plugin.route({
        method: 'POST',
        path: '/api/user/create',
        handler: function(request, reply) {
            user = new User();
            user.username = request.payload.username;
            user.password = request.payload.password;

            user.save(function(err) {
                if (!err) {
                    reply(user);
                } else {
                    reply(err);
                }

            });
        },
        config: {
            auth: 'session'
        }
    });

    plugin.route({
        method: 'GET',
        path: '/api/product',
        handler: require('./show-products')
    });

    plugin.route({
        method: 'GET',
        path: '/api/product/{id}',
        handler: require('./show-product-detail')
    });

    plugin.route({
        method: 'POST',
        path: '/api/product/add',
        handler: function(request, reply) {
            produce = new Produce();
            produce.label = request.payload.label;
            produce.price = request.payload.price;
            produce.uom = request.payload.uom;
            produce.category = request.payload.category;

            produce.save(function(err) {
                if (!err) {
                    reply(produce);
                } else {
                    reply(err);
                }

            });
        },
        config: {
            auth: 'session'
        }
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
