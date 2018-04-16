import * as React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import GoodsLins from 'views/goodsList';
import GoodsDetail from 'views/goodsDetail';
/**
 * xxxxx
 *
 * @export
 * @returns {array}
 */
export default function(): JSX.Element{
    return (<Switch>
        <Route key="default" path="/" render={() => <Redirect to="/list" />} exact />
        <Route key="GoodsLins" path="/list" component={GoodsLins} />
        <Route key="GoodsDetail" path="/detail" component={GoodsDetail} />
    </Switch>);
}
