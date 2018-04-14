import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import AppState from 'store/appState';

@inject('appState') @observer
export default class GoodsList extends React.Component {
    // propTypes = {
    //     appState: PropsTypes.instanceOf(AppState).isRequired,
    // }
    // constructor(props) {
    //     super(props);
    //     this.propTypes = {
    //         appState: PropsTypes.instanceOf(AppState).isRequired,
    //     };
    // }
    componentDidMount() {
        setInterval(() => {
            this.props.appState.add();
        }, 1000);
    }

    render() {
        return (
            <div>
                <div>{this.props.appState.msg}</div>
            </div>
        );
    }
}

GoodsList.propTypes = {
    appState: PropTypes.instanceOf(AppState),
};

// GoodsList.propTypes = {
//     appState: PropTypes.instanceOf(AppState).isRequired,
// };
// GoodsList.defaultProps = {
//     appState: PropTypes.instanceOf(appState).isRequired,
// };