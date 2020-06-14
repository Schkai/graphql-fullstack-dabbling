import { Switch, Route } from 'react-router-dom'
import React, { Fragment } from 'react'
import Header from './Header'
import Animals from '../pages/Animnals'

const App = () => (
    <Fragment>
        <Header />
        <div>
            <Switch>
                <Route exact path="/" component={Animals} />
            </Switch>
        </div>
    </Fragment>
)

export default App
