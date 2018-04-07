import webpack from 'webpack';
import merge from 'webpack-merge';


import * as useUtils from './utils-use';
import webpackBase from './webpack.clientBase';

import config from '../config';

export default merge(webpackBase, {
    entry: {
        main: ['react-hot-loader/patch']
    }
});