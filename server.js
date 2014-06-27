var Hapi = require('hapi');
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/rfmproducetogo');

var server = new Hapi.Server(8080, "localhost");

server.pack.register([{
    plugin: require("lout")
}, {
    plugin: require('hapi-auth-cookie')
}, {
    plugin: require("./plugins/auth")
}, {
    plugin: require("./plugins/togo")
}], function(err) {
    if (err) throw err;
    server.start(function() {
        console.log("hapi server started @ " + server.info.uri);
    });
});
