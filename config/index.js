import path from 'path';
import * as useUtils from '../build/utils-use';

export default {
    server: {
        mainJs: {
            srcPath: path.join(path.resolve(process.cwd(), ''),'./src/main-server/**/*.{ts,tsx,js,jsx}')
        }
    },
    comm: {
        mainJs: {
            srcPath: path.join(path.resolve(process.cwd(), ''),'./src/main/**/*.{ts,tsx,js,jsx}')
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
        assetsPublicPath: '/public',
        host: 'localhost',
        port: '8020',
        errorOverlay: true,
        showEslintErrorsInOverlay: false,
        useEslint: true, // 是否启用eslint
        devtool: 'source-map',
    },
    build: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/public',
        showEslintErrorsInOverlay: false,
        useEslint: true, // 是否启用eslint
        devtool: ''
    }
}