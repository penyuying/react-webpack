require('babel-core/register');
const config = require('../config');
const path = require('path');
const fs = require('fs');
const Express = require('express');
const ReactSSR = require('react-dom/server');


const serverEntry = require('../dist/build/server-main').default;

const app = new Express();
const template = fs.readFileSync(path.join(process.cwd(), 'dist/build/index.html'), 'utf8');

app.use('/static', Express.static(path.resolve(process.cwd(), 'dist/build/static')));


app.get('*', function(req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(template.replace('<!--replace-text-->', appString));
});

app.listen(1234, function() {
    console.log('server is listen in 1234');
});