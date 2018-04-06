'use strict'
import path from 'path';
import merge from 'webpack-merge';

import * as useUtils from './utils-use';
import userWebpackConfig from './webpack.user';

import config from '../config';


export default merge({
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, '../'),
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