var info = require('./controllers/info');

module.exports = [{
    path: '/',
    method: 'GET',
    handler: info.index
}, {
    path: '/pricing',
    method: 'GET',
    handler: info.pricing
}];
