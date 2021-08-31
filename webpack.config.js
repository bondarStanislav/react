const serverConfig = require('./cfg/webpack.server.config');
const clientConfig = require('./cfg/webpack.client.config');

module.exports = [
    clientConfig,
    serverConfig,
];