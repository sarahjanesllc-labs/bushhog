var Hapi = require('hapi');
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/rfmproducetogo');

var server = new Hapi.Server(8080, "localhost", {
    views: {
        engines: {
            jade: require("jade")
        },
        path: "./views"
    }
});

var rootHandler = function(request, reply) {
    reply({
        message: "hai2u"
    });
};

server.route({
    path: "/",
    method: "GET",
    handler: rootHandler
});

server.pack.register([{
    plugin: require("lout")
}, {
    plugin: require("./plugins/togo")
}], function(err) {
    if (err) throw err;
    server.start(function() {
        console.log("hapi server started @ " + server.info.uri);
    });
});
