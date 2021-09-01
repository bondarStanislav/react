const webpack = require('webpack');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(webpackDevMiddleWare(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
    stats: 'errors-only',
}));

hmrServer.use(webpackHotMiddleWare(clientCompiler, {
    path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
    console.log('HMR serv started.');
});

//Server compilation.
const compiler = webpack(webpackServerConfig);

compiler.run((err) => {
    if (err) {
        console.log('Compilation ffailed: ', err);
    }

    compiler.watch({}, (err) => {
        if (err) {
            console.log('Compilation ffailed: ', err);
        }

        console.log('Compiled succesffully!');
    });
    

    nodemon({
        script: path.resolve(__dirname, '../dist/server/server.js'),
        watch: [
            path.resolve(__dirname, '../dist/server'),
            path.resolve(__dirname, '../dist/client'),
        ],
    });
});