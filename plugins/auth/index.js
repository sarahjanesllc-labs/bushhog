var Joi = require('joi');
var config = require('../../config.js');
var User = require('../../models/user').User;
var path = require('path');

exports.register = function(plugin, options, next) {
    plugin.views({
        engines: {
            jade: require('jade')
        },
        path: path.resolve(__dirname, '../../views')
    });
    plugin.dependency('hapi-auth-cookie');
    plugin.auth.strategy('session', 'cookie', {
        password: config.session.password,
        cookie: config.session.cookie,
        isSecure: false,
        redirectTo: '/auth/login'
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
    var items = {
        config: config.meta
    };
    plugin.route({
        method: ['GET', 'POST'],
        path: '/login',
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.redirect('/admin');
            }

            if (request.method === 'post') {
                if (!request.payload.username || !request.payload.password) {
                    items.message = "Needs username/password.";
                } else {
                    User.findOne({
                        'username': request.payload.username
                    }, function(err, user) {
                        if (err) {
                            reply(err);
                        }
                        if (user && request.payload.password === user.password) {
                            request.auth.session.set(user);
                            reply.redirect('/admin');
                        } else {
                            items.message = "Invalid login.";
                        }
                    });
                }
            }
            if (request.method === 'get' || items.message) {
                return reply.view('auth/login', items);
            }
        }
    });
};

exports.logout = function(plugin) {
    plugin.route({
        method: 'GET',
        path: '/logout',
        handler: function(request, reply) {
            request.auth.session.clear();
            return reply.redirect('/');
        },
        config: {
            auth: 'session'
        }
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};
