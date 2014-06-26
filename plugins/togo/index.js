var Joi = require('joi');
var Produce = require('../../models/produce').Produce;

exports.register = function(plugin, options, next) {
    var Hapi = plugin.hapi;

    var indexHandler = function(request, reply) {
        Produce.find({}, function(err, items) {
            if (!err) {
                reply(items);
            } else {
                reply(err);
            }
        });
    };

    var detailHandler = function(request, reply) {
        Produce.findById(request.params.id, function (err, item) {
            if (!err && item) {
                reply(item);
            } else if (err) {
                reply(Hapi.boom.notFound());
            } else {
                reply(Hapi.boom.notFound());
            }
        });
    };

    var cartHandler = function(request, reply) {
        reply(Hapi.error.internal('Not implemented yet.'));
    };

    var checkoutHandler = function(request, reply) {
        reply(Hapi.error.internal('Not implemented yet.'));
    };

    var addProduceHandler = function(request, reply) {
        produce = new Produce();
        produce.label = request.payload.label;
        produce.price = request.payload.price;
        produce.uom = request.payload.uom;
        produce.category = request.payload.category;

        produce.save(function(err) {
            if (!err) {
                reply(produce).created('/togo/' + produce._id);
            } else {
                reply(err);
            }

        });
    };

    plugin.route({
        path: "/togo",
        method: "GET",
        handler: indexHandler
    });
    plugin.route({
        path: "/togo/add",
        method: "POST",
        handler: addProduceHandler
    });
    plugin.route({
        path: "/togo/{id}",
        method: "GET",
        handler: detailHandler
    });
    plugin.route({
        path: "/togo/cart",
        method: "GET",
        handler: cartHandler
    });
    plugin.route({
        path: "/togo/checkout",
        method: "GET",
        handler: checkoutHandler
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
