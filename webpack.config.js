const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
    mode: 'production',
    entry: {
        'popup': './src/js/popup.js',
        'page': './src/js/page.js',
        'core': './src/js/core.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    cache: true,
    devtool: false,

    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                         { from: './manifest.json' },
                         { from: './src/images' },
                         { from: './src/views' },
                         { from: './src/css/bootstrap.2.2.2.min.css'}
                     ]
        })
    ]
};
