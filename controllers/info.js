var Blog = require('../models/blog').Blog;
var config = require('../config.js');

module.exports = {};

var items = {
    config: config.meta
};

module.exports.index = function(req, reply) {
    reply.view('views/info/splashpage', items);
};

module.exports.pricing = function(req, reply) {
    items.pageHeading = 'Pricing';
    reply.view('views/info/pricing', items);
};
