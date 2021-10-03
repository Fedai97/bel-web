import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './routes';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Router/>
    </BrowserRouter>,
    document.getElementById('root'),
);
