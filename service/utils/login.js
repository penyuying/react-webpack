import Express from 'express';
import axios from 'axios';

const router = Express.Router();
const baseUrl = 'http://cnodejs.org/api/v1';

router.post('/login', (req, res, next) => {
    axios.post(`${baseUrl}/accesstoken`, {
        accesstoken: req.body.accessToken
    })
        .then(back => {
            if(back.status === 200 && back.data.success){
                req.session.user = {
                    accessToken: req.body.accessToken,
                    loginName: back.data.loginname,
                    id: back.data.id,
                    avatarUrl: back.data.avatar_url
                }
            }
            res.send({
                success: back.data.success || false,
                message: back.data.success && '登录成功' || '登录失败'
            })
        }).catch(err => {
            res.send(err);
        });
});

export default router;