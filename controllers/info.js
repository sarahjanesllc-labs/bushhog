var Blog = require('../models/blog').Blog;
var config = require('../config.js');

module.exports = {};

var items = {
    config: config.meta
};

module.exports.index = function(req, reply) {
    reply.view('views/info/splashpage', items);
};
