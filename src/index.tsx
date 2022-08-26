import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/app';
import KeyboardContextProvider from './context/keyboardContextProvider';
import { Provider } from 'react-redux';
import store from './store/store';

/**
 * Entry point
 */
class Program {
    
    Main() {

        var app = (
            <React.StrictMode>
                <Provider store={store}>
                    <KeyboardContextProvider>
                        <App />
                    </KeyboardContextProvider>                
                </Provider>
            </React.StrictMode>
        );

        ReactDOM.render(app, document.getElementById('guess6'));
    }
}

new Program().Main();