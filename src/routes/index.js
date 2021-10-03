import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from '../pages/Main';
import FilePage from '../pages/File';
import QRPage from '../pages/QR';
import AddPage from '../pages/Add';

export const Router = () => {
    return (
        <main className="content">
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/add/" component={AddPage}/>
                <Route exact path="/file/:externalID" component={FilePage}/>
                <Route exact path="/qr/:externalID" component={QRPage}/>
            </Switch>
        </main>
    )
};
