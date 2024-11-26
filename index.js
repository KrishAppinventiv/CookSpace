/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


import { Provider } from 'react-redux';
import { persistor, Store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const AppRedux = () =>(
    <Provider store={Store}>
        <PersistGate persistor={persistor} loading={null}>
        <App/>
        </PersistGate>
    </Provider> 
)
AppRegistry.registerComponent(appName, () => AppRedux );
