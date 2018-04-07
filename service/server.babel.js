import 'babel-core/register';
import path from 'path';
import fs from 'fs';
import config from '../config';
import webpackConfig from '../build/webpack.server.config.babel';
import serverConfig from './server.dev.config';

import Express from 'express';
import ReactSSR from 'react-dom/server';


const app = new Express();

if(process.env.NODE_ENV === 'production'){
    const serverEntry = require('../dist/build/server-main');
    const template = fs.readFileSync(path.join(process.cwd(), 'dist/build/index.html'), 'utf8');

    app.use(path.join(webpackConfig.output.publicPath || '','/static').replace(/\\/g, '/') , Express.static(path.resolve(process.cwd(), 'dist/build/static')));


    app.get('*', function(req, res) {
        const appString = ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<!--replace-text-->', appString));
    });
} else {
    serverConfig(app);
}

app.listen(1234, function() {
    console.log('server is listen in 1234');
});