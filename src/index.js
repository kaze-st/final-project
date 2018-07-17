import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

//Firebase
import firebase from 'firebase/app';
import 'firebase/auth';

let config = {
    apiKey: "AIzaSyBrOBYTyRs3mEZn1YxaoW6bP12DdJEuDVs",
    authDomain: "info343-final-project-9febf.firebaseapp.com",
    databaseURL: "https://info343-final-project-9febf.firebaseio.com",
    projectId: "info343-final-project-9febf",
    storageBucket: "info343-final-project-9febf.appspot.com",
    messagingSenderId: "561421371431"
};
firebase.initializeApp(config);

let page = <BrowserRouter> 
                <App /> 
            </BrowserRouter>;

ReactDOM.render(page, document.getElementById('root'));

registerServiceWorker();
