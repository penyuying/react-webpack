import { hot, setConfig } from 'react-hot-loader'
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div>this is app123</div>
        );
    }
}

setConfig({ logLevel: 'debug' })

export default hot(module)(App)
// export default App;