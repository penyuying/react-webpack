'use strict'
import * as useUtils from './utils-use';
import config from '../config'

export default {
    resolve: {
        extensions: ['.js','.jsx'],
        alias: {
            src: useUtils.absPath('src'),
            app: useUtils.absPath('src/app'),
            views: useUtils.absPath('src/app/views'),
            config: useUtils.absPath('src/app/config'),
            routes: useUtils.absPath('src/app/config/routes'),
            store: useUtils.absPath('src/app/store'),
        }
    }
}