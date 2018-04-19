import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'http://cnodejs.org/api/v1';

export default (req, res, next) => {
    const serviceCode = req.path;
    const _user = req.session.user || {};
    const _accessToken = _user.accessToken;
    const _query = Object.assign({}, req.query);
    const _isToken = _query.accessToken;
    if (_isToken && !_accessToken) {
        res.status(401)
        .send({
            success: false,
            msg: '请先登录！'
        })
        return;
    }

    if (_isToken) {
        delete _query.accessToken;
    }

    if(serviceCode) {
        axios(`${baseUrl}${serviceCode}`, {
            method: req.method,
            params: Object.assign({},_query, {
                accesstoken: req.method === 'GET' && _isToken && _accessToken || undefined
            }),
            data: queryString.stringify(Object.assign({}, req.body, {
                accesstoken: req.method === 'POST' && _isToken && _accessToken || undefined
            })),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(back => {
            if(back.status === 200) {
                res.send(back.data);
            } else {
                res.status(back.status).send(back.data);
            }
        }).catch(err => {
            if (err.response) {
                res.status(500).send(err.response.data);
            } else {
                res.status(500).send({
                    success: false,
                    msg: '未知错误'
                });
            }
        });
    }
}