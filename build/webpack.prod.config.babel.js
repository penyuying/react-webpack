import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import * as useUtils from './utils-use';
import webpackBase from './webpack.clientBase';

import config from '../config';

export default merge(webpackBase, {
    entry: {
        main: ['react-hot-loader/patch']
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false
              }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        })
    ]
});