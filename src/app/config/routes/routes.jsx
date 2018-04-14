import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import GoodsLins from 'views/goodsList';
import GoodsDetail from 'views/goodsDetail';
/**
 * xxxxx
 *
 * @export
 * @returns {array}
 */
export default function() {
    return [
        <Route key="default" path="/" render={() => <Redirect to="/list" />} exact />,
        <Route key="GoodsLins" path="/list" component={GoodsLins} exact />,
        <Route key="GoodsDetail" path="/detail" component={GoodsDetail} />,
    ];
}