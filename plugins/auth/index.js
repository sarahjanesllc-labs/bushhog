var Joi = require('joi');
var config = require('../../config.js');
var User = require('../../models/user').User;

exports.register = function(plugin, options, next) {
    plugin.dependency('hapi-auth-cookie');
    plugin.auth.strategy('session', 'cookie', {
        password: config.session.password,
        cookie: config.session.cookie,
        isSecure: false,
        redirectTo: false
    });

    // Expose register route if a user doesn't exist
    User.findOne({}, function(err, user) {
        if (!user) {
            exports.create(plugin);
        }
    });

    exports.login(plugin);
    exports.logout(plugin);
    next();
};

exports.create = function(plugin) {
    plugin.route({
        method: 'POST',
        path: '/auth/create',
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
        }
    });
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
                User.findOne({
                    'username': request.payload.username
                }, function(err, user) {
                    if (err) {
                        reply(err);
                    }
                    if (user && request.payload.password === user.password) {
                        request.auth.session.set(user);
                        reply({
                            message: "success."
                        });
                    } else {
                        reply({
                            message: "Invalid login."
                        });
                    }
                });
            }
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
        },
        config: {
            auth: 'session'
        }
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};
