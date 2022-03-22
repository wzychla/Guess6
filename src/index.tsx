import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/app';
import KeyboardContextProvider from './keyboardContextProvider';

/**
 * Entry point
 */
class Program {
    
    Main() {

        var app = (
            <React.StrictMode>
                <KeyboardContextProvider>
                    <App />
                </KeyboardContextProvider>                
            </React.StrictMode>
        );

        ReactDOM.render(app, document.getElementById('guess6'));
    }
}

new Program().Main();