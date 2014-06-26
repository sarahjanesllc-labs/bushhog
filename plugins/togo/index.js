var Joi = require('joi');
var Produce = require('../../models/produce').Produce;

exports.register = function(plugin, options, next) {
    var Hapi = plugin.hapi;

    exports.index(plugin);
    exports.show(plugin);
    exports.create(plugin);
    next();
};

exports.index = function(plugin) {
    plugin.route({
        method: 'GET',
        path: '/togo',
        handler: function(request, reply) {
            Produce.find({}, function(err, items) {
                if (!err) {
                    reply(items);
                } else {
                    reply(err);
                }
            });
        }
    });
};

exports.show = function(plugin) {
    plugin.route({
        method: 'GET',
        path: '/togo/{id}',
        handler: function(request, reply) {
            Produce.findById(request.params.id, function(err, item) {
                if (!err && item) {
                    reply(item);
                } else if (err) {
                    reply(Hapi.boom.notFound());
                } else {
                    reply(Hapi.boom.notFound());
                }
            });
        }
    });
};

exports.create = function(plugin) {
    plugin.route({
        method: 'POST',
        path: '/togo/add',
        handler: function(request, reply) {
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
        }
    });
};


exports.register.attributes = {
    pkg: require('./package.json')
};
