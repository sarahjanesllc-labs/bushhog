var Hapi = require('hapi');
var config = require('./config');
var Mongoose = require('mongoose');
var routes = require('./routes');

Mongoose.connect('mongodb://localhost/2market2market');

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
    plugin: require('hapi-auth-cookie')
}, {
    plugin: require('./plugins/auth')
}, {
    plugin: require('./plugins/api')
}], function(err) {
    if (err) throw err;
    server.start(function() {
        console.log("hapi server started @ " + server.info.uri);
    });
});

server.route(routes);
