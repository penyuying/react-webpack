import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import { Link } from 'react-router-dom';
import Routes from 'routes/routes';

class App extends React.Component {
    componentDidMount() {

    }
    render() {
        return [
            <div key="app">
                <Link href="/list" to="/list">list</Link>
                <br />
                <Link href="/detail" to="/detail">detail</Link>
            </div>,
            <Routes key="appRoutes" />,
        ];
    }
}


setConfig({ logLevel: 'debug' });

export default hot(module)(App);
// export default App;