var Hapi = require('hapi');
var config = require('config.js');
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/rfmproducetogo');

var server = new Hapi.Server(8080, "localhost", config.server);

server.route({
    path: '/favicon.ico',
    method: 'GET',
    handler: {
        file: './favicon.ico'
    }
});

server.route({
    path: '/static/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './static',
            listing: false,
            index: false
        }
    }
});

server.pack.register([{
    plugin: require("lout")
}, {
    plugin: require('hapi-auth-cookie')
}, {
    plugin: require("./plugins/auth")
}, {
    plugin: require("./plugins/togo")
}, {
    plugin: require("./plugins/info")
}], function(err) {
    if (err) throw err;
    server.start(function() {
        console.log("hapi server started @ " + server.info.uri);
    });
});
