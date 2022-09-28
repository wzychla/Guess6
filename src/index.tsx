import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/app';
import KeyboardContextProvider from './context/keyboardContextProvider';
import { Provider } from 'react-redux';
import store from './store/store';
import { RecoilRoot } from 'recoil';

/**
 * Entry point
 */
class Program {
    
    Main() {

        var app = (
            <React.StrictMode>
                <RecoilRoot> {/* Recoil */}
                    <Provider store={store}> {/* Redux */}
                        <KeyboardContextProvider> {/* Shared Context */}
                            <App />
                        </KeyboardContextProvider>                
                    </Provider>
                </RecoilRoot>
            </React.StrictMode>
        );

        ReactDOM.render(app, document.getElementById('guess6'));
    }
}

new Program().Main();