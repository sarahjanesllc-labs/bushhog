var Joi = require('joi');
var path = require('path');

exports.register = function(plugin, options, next) {
    plugin.views({
        engines: { hbs: require('handlebars')},
        path: path.resolve(__dirname, 'templates')
    });
    exports.index(plugin);
    exports.show(plugin);
    exports.create(plugin);
    exports.how(plugin);
    next();
};

exports.index = function(plugin) {
    var items = {
        pageHeading: 'Shop online, pick up at our drive-thru!'
    };
    plugin.route({
        method: 'GET',
        path: '/togo',
        handler: function(request, reply) {
            Produce.find({}, function(err, res) {
                if (!err) {
                    items.produce = res;
                    reply.view('all-items', items);
                } else {
                    reply(err);
                }
            });
        }
    });
};

exports.how = function(plugin) {
    var items = {
        pageHeading: 'How this Works'
    };
    plugin.route({
        method: 'GET',
        path: '/togo/how-this-works',
        handler: function(request, reply) {
            reply.view('how-this-works', items);
        }
    });
};

/**
 * GET /togo/{id}
 * Gets the produce by {id}
 *
 * @param plugin
 */
exports.show = function(plugin) {
    var Hapi = plugin.hapi;

    plugin.route({
        method: 'GET',
        path: '/togo/{id}',
        handler: function(request, reply) {
            Produce.findById(request.params.id, function(err, item) {
                if (!err && item) {
                    reply(item);
                } else if (err) {
                    reply(Hapi.boom.notFound("No produce found."));
                } else {
                    reply(Hapi.boom.notFound("No produce found."));
                }
            });
        }
    });
};



exports.register.attributes = {
    pkg: require('./package.json')
};
