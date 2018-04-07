import path from 'path';
import axios from 'axios';
import webpack from 'webpack';
import MemoryFs from 'memory-fs';
import webpackConfig from '../build/webpack.server.config.babel';
import ReactSSR from 'react-dom/server';
import proxy from 'http-proxy-middleware';

let serverBundle;

const Module = module.constructor;

const mfs = new MemoryFs();

const serverComplier = webpack(webpackConfig);

function getTemplate() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8020/public/index.html')
        .then(res => {
            resolve(res.data);
        })
        .catch(reject)
    });
}

serverComplier.outputFileSystem = mfs;

serverComplier.watch({}, (err, stats) => {
    if(err) {
        throw err;
    }
    let _stats = stats.toJson();
    _stats.errors.forEach(err => console.log(err));
    _stats.warnings.forEach(warn => console.log(warn));



    const bundlePath = path.join(webpackConfig.output.path, 'server-main.js');

    const text = mfs.readFileSync(bundlePath, 'utf-8');
    const m = new Module();

    m._compile(text, 'server-main.js');

    serverBundle = m.exports.default;
});

export default function (app) {
    app.use(path.join(webpackConfig.output.publicPath || '','/static').replace(/\\/g, '/') , proxy({
        target: 'http://localhost:8020'
    }));

    app.use(webpackConfig.output.publicPath , proxy({
        target: 'http://localhost:8020'
    }));

    app.get('*', (req, res) => {
        getTemplate().then(template => {
            const appString = ReactSSR.renderToString(serverBundle);
            res.send(template.replace('<!--replace-text-->', appString));
        });
    })
}