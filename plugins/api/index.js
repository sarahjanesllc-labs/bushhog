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

    /*
     * blog api
     */
    plugin.route({
        method: 'GET',
        path: '/api/blog/list',
        handler: function(request, reply) {
            Blog.find({}, function(err, res) {
                if (!err) {
                    reply(res);
                } else {
                    reply(err);
                }
            });
        }
    });

    plugin.route({
        method: 'POST',
        path: '/api/blog/new',
        handler: function(request, reply) {
            entry = new Blog();
            entry.author = request.payload.username;
            entry.md = request.payload.body;
            entry.title = request.payload.title;

            entry.save(function(err) {
                if (!err) {
                    reply(entry);
                } else {
                    reply(err);
                }

            });
        },
        config: {
            auth: 'session'
        }
    });

    /*
     * vendor api
     */
    plugin.route({
        method: 'GET',
        path: '/api/vendor/list',
        handler: function(request, reply) {
            Vendor.find({}, function(err, res) {
                if (!err) {
                    reply(res);
                } else {
                    reply(err);
                }
            });
        }
    });

    plugin.route({
        method: 'POST',
        path: '/api/vendor/new',
        handler: function(request, reply) {
            entry = new Vendor();
            entry.vendorname = request.payload.vendorname;
            entry.bio = request.payload.bio;
            entry.category = request.payload.category;
            entry.facebookID = request.payload.facebookID;
            entry.twitterID = request.payload.twitterID;
            entry.pintrestID = request.payload.pintrestID;
            entry.linkedinID = request.payload.linkedinID;

            entry.save(function(err) {
                if (!err) {
                    reply(entry);
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
