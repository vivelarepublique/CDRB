const path = require('path');
const { BannerPlugin } = require('webpack');
const { banner, scriptFilename } = require('./config/banner.js');

const config = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: scriptFilename,
        pathinfo: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'production',
    optimization: {
        minimize: false,
    },
    performance: {
        maxAssetSize: 1024 * 1024 * 4,
        maxEntrypointSize: 1024 * 1024 * 4,
    },
    plugins: [
        new BannerPlugin({
            banner: banner,
            raw: true,
        }),
    ],
};

module.exports = config;
