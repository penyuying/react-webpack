import path from 'path';
import * as useUtils from '../build/utils';

export default {
    comm: {
        mainJs: {
            srcPath: path.join(path.resolve(__dirname, '../'),'./src/main/**/*.js')
        },
        index: useUtils.getHtmlPath({
            srcPath:path.join(path.resolve(__dirname, '../'),'./src/pages-tpls/**/*.html'),
            prefix:''
        }),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist/build')
    },
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    },
    build: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    }
}