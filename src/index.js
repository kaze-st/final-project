import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

let page = <BrowserRouter> 
                <App /> 
            </BrowserRouter>;

ReactDOM.render(page, document.getElementById('root'));
registerServiceWorker();
