var path = require('path');

exports.session = {
    password: 'i should probably set this to something s3cure',
    cookie: 's',
    expiresIn: 14 * 24 * 60 * 60 * 1000 // 2 weeks
};

exports.server = {
    views: {
        engines: {
            hbs: require('handlebars')
        },
        partialsPath: path.resolve(__dirname, 'views')
    }
};
