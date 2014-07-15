var info = require('./controllers/info');

module.exports = [{
    path: '/',
    method: 'GET',
    handler: info.index
},
{
    path: '/about',
    method: 'GET',
    handler: info.about
},
{
    path: '/location',
    method: 'GET',
    handler: info.location
}];
