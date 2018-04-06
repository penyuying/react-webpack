import webpack from 'webpack';
import merge from 'webpack-merge';


import * as useUtils from './utils';
import webpackBase from './webpack.base.config.babel';

import config from '../config';

export default merge(webpackBase, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV
        }),
        ...(useUtils.getHtmlPlugin(config.comm.index||'index.html')||[])
    ]
});