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
            loader: require.resolve('babel-loader'),
            options: {
                cacheDirectory: true,
                plugins: ['react-hot-loader/babel'],
            }
            // loader: 'babel-loader'
        }, {
            test: /.js$/,
            loader: require.resolve('babel-loader'),
            options: {
                // This is a feature of `babel-loader` for Webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                plugins: ['react-hot-loader/babel'],
            },
            // loader: 'babel-loader',
            exclude: [
                useUtils.absPath('node_modules')
            ]
        }]
    }
}, userWebpackConfig);