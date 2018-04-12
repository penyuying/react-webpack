'use strict'
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import * as useUtils from './utils-use';
import * as utils from './utils';
import userWebpackConfig from './webpack.base';

import config from '../config';


export default merge({
    entry: useUtils.getMainPath(config.comm.mainJs, 'jsx'),
    output: {
        path: config.comm.assetsRoot,
        filename: utils.assetsPath('[name].[hash:8].js'),
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV
        }),
        ...(useUtils.getHtmlPlugin(config.comm.index||'index.html')||[])
    ]
}, userWebpackConfig);
