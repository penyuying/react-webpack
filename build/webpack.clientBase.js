'use strict'
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import * as useUtils from './utils-use';
import * as utils from './utils';
import userWebpackConfig from './webpack.base';

import config from '../config';


export default merge({
    entry: useUtils.getMainPath(config.comm.mainJs, 'js'),
    output: {
        path: config.comm.assetsRoot,
        filename: utils.assetsPath('[name].[hash:8].js'),
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    devtool: process.env.NODE_ENV === 'production' ? config.build.devtool : config.dev.devtool,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development") }
        }),
        ...(useUtils.getHtmlPlugin(config.comm.index||'index.html')||[])
    ]
}, userWebpackConfig);
