'use strict'
import * as useUtils from './utils';
import config from '../config'

export default {
    context: '',
    entry: useUtils.getMainPath(config.comm.mainJs, 'js'),
    resolve: {
        extensions: ['.js','.jsx'],
        alias: {
            src: useUtils.absPath('src'),
            app: useUtils.absPath('src/app'),
        }
    }
}