import webpack from 'webpack';
import merge from 'webpack-merge';


import * as useUtils from './utils-use';
import webpackBase from './webpack.base';

import config from '../config';

export default merge({
    entry: {
        'server-main': ['webpack/hot/dev-server']
    }
},merge(webpackBase, {
    target: 'node',
    entry: useUtils.getMainPath(config.server.mainJs, 'jsx'),
    output: {
        path: config.comm.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
        libraryTarget: 'commonjs'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}));