var Hapi = require('hapi');
var Produce = require('../../models/produce').Produce;

module.exports = function(request, reply) {
    Produce.findById(request.params.id, function(err, item) {
        if (!err && item) {
            reply(item);
        } else if (err) {
            reply(Hapi.boom.notFound("No produce found."));
        } else {
            reply(Hapi.boom.notFound("No produce found."));
        }
    });
};
