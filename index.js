/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import Store from './src/redux/store';


const AppRedux = () =>(
    <Provider store={Store}>
        
        <App/>
      
        
    </Provider> 
)
AppRegistry.registerComponent(appName, () => AppRedux );
