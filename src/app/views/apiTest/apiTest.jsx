import React from 'react';
import axios from 'axios';

/* eslint-disable */
export default class ApiTest extends React.Component {
    /**
     * 获取getTopics
     *
     * @memberof ApiTest
     */
    getTopics() {
        axios.get('/api/topics')
            .then(back => {
                console.log(back.data);
            });
    }

    login() {
        axios.post('/api/user/login', {
            accessToken: 'acbecbd7-e6f5-404e-b200-337c37beac8a',
        })
            .then(back => {
                console.log(back.data);
            });
    }

    markAll() {
        axios.post('/api/message/mark_all?accessToken=true')
            .then(back => {
                console.log(back.data);
            });
    }
    render() {
        return (
            <div>
                <button onClick={this.getTopics}>topics</button>
                <button onClick={this.login}>login</button>
                <button onClick={this.markAll}>markAll</button>
            </div>
        );
    }
}