import webpack from 'webpack';
import merge from 'webpack-merge';


import * as useUtils from './utils-use';
import webpackBase from './webpack.clientBase';

import config from '../config';

let webpackConfig = merge(webpackBase, {
    entry: {
        main: ['react-hot-loader/patch']
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*', // 5
        },
        inline: true,
        host: config.dev.host || '0.0.0.0',
        port: config.dev.port || 8080,
        contentBase: useUtils.absPath('dist/build'),
        hot: true,
        compress: true,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: webpackBase.output.publicPath || '',
        historyApiFallback: {
            index: (webpackBase.output.publicPath || '') + '/index.html'
        },
        proxy: {
            '/api/': 'http://localhost:1234'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
export default webpackConfig;