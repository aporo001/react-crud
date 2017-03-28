import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Test from './components/Test'
import FormItem from './components/FormItem'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)
const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
)


class App extends Component {

  render() {

    return (
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={FormItem} />
            <Route path="/edit/:id" component={FormItem} />
            <Route path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
          
        </div>
      </div>

    );
  }
}

export default App;
