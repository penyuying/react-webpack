'use strict'
import path from 'path';
import merge from 'webpack-merge';
import eslintFormatter from 'eslint-friendly-formatter';

import * as useUtils from './utils-use';
import userWebpackConfig from './webpack.user';

import config from '../config';


export default merge({
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, '../'),
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [path.join(__dirname, '..', 'src')],
            // exclude: /node_modules/,
            options: {
                configFile: useUtils.absPath('.eslintrc.js'),
                formatter: eslintFormatter,
                emitWarning: !config.dev.showEslintErrorsInOverlay
            }
        }, {
            test: /.jsx$/,
            // loader: require.resolve('babel-loader'),
            options: {
                cacheDirectory: true,
            //     plugins: ['react-hot-loader/babel'],
                compact: true,
            //     presets: ['es2015', 'react']
            },
            loader: 'babel-loader'
        }, {
            test: /.js$/,
            // loader: require.resolve('babel-loader'),
            options: {
            //     // This is a feature of `babel-loader` for Webpack (not Babel itself).
            //     // It enables caching results in ./node_modules/.cache/babel-loader/
            //     // directory for faster rebuilds.
                cacheDirectory: true,
            //     plugins: ['react-hot-loader/babel'],
                compact: true,
            //     presets: ['es2015', 'react']
            },
            loader: 'babel-loader',
            exclude: [
                useUtils.absPath('node_modules')
            ]
        }]
    }
}, userWebpackConfig);