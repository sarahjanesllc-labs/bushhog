var Joi = require('joi');
var Produce = require('../../models/user').User;

exports.register = function(plugin, options, next) {

    exports.login(plugin);
    exports.logout(plugin);
    next();
};

exports.login = function(plugin) {
    plugin.route({
        method: 'POST',
        path: '/auth/login',
        handler: function(request, reply) {
            if (!request.auth.isAuthenticated) {
                if (!request.payload.username || !request.payload.password) {
                    reply({
                        message: "Needs username/password."
                    });
                }
                User.findByUsername(request.payload.username, function(err, res) {
                    if (!res || request.payload.password !== res.password) {
                        reply({
                            message: "Invalid login."
                        });
                    }
                });
            }
            request.auth.session.set(res);
        }
    });
};

exports.logout = function(plugin) {
    plugin.route({
        method: 'GET',
        path: '/auth/logout',
        handler: function(request, reply) {
            request.auth.session.clear();
            reply({
                message: "Logged out."
            });
        }
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};
