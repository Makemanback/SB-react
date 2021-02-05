import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SwapiServiceProvider } from "../swapi-service-context";
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundary from '../error-boundary';
import {
  PeoplePage,
  PlanetPage,
  StarshipPage,
  LoginPage,
  SecretPage
} from '../pages'

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import './app.css';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  componentDidCatch() {
     this.setState({
       hasError: true
     })
  }

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      }
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const {isLoggedIn} = this.state;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Switch>
                <Route exact path='/' render={() => <h2>Welcome to Star DB!</h2>} />
                <Route path='/people/:id?' component={PeoplePage} />
                <Route path='/planets' component={PlanetPage} />
                <Route exact path='/starships' component={StarshipPage} />
                <Route path='/starships/:id'
                      render={({match}) => {
                        const {params: {id}} = match;
                        return <StarshipDetails itemId={id} />
                  }}/>
                <Route path='/login' render={() => {
                  return (
                  <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>
                  )}} />
                <Route path='/secret' render={() => {
                  return (
                  <SecretPage isLoggedIn={isLoggedIn} />
                  )}} />

                <Route render={() => <h2>Page not found</h2>} />
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
