import path from 'path';
import * as useUtils from '../build/utils-use';

export default {
    server: {
        mainJs: {
            srcPath: path.join(path.resolve(process.cwd(), ''),'./src/main-server/**/*.js')
        }
    },
    comm: {
        mainJs: {
            srcPath: path.join(path.resolve(process.cwd(), ''),'./src/main/**/*.js')
        },
        index: useUtils.getHtmlPath({
            srcPath:path.join(path.resolve(process.cwd(), ''),'./src/pages-tpls/**/*.html'),
            prefix:''
        }),

        // Paths
        assetsRoot: path.resolve(process.cwd(), 'dist/build')
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