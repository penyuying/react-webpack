'use strict'
import path from 'path';
import merge from 'webpack-merge';

import * as useUtils from './utils';
import userWebpackConfig from './webpack.user.config.babel';

import config from '../config';


export default merge({
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, '../'),
    output: {
        path: config.comm.assetsRoot,
        filename: '[name].[hash:8].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: /.jsx$/,
            loader: 'babel-loader'
        }, {
            test: /.js$/,
            loader: 'babel-loader',
            exclude: [
                useUtils.absPath('node_modules')
            ]
        }]
    }
}, userWebpackConfig);