import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from '../pages/Main';
import FilePage from '../pages/File';

export const Router = () => {
    return (
        <main className="content">
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/file/:externalID" component={FilePage}/>
            </Switch>
        </main>
    )
};
