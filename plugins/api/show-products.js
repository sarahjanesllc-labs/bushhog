var Hapi = require('hapi');
var Produce = require('../../models/produce').Produce;

module.exports = function(request, reply) {
    Produce.find({}, function(err, res) {
        if (!err) {
            reply(res);
        } else {
            reply(err);
        }
    });
};
