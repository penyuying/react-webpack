'use strict'
import * as useUtils from './utils-use';
import config from '../config'

export default {
    resolve: {
        extensions: ['.js','.jsx'],
        alias: {
            src: useUtils.absPath('src'),
            app: useUtils.absPath('src/app'),
        }
    }
}