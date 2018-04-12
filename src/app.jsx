import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

import Home from './page/Home/'
import MainLayout from './component/MainLayout/'

import './css/AdminLTE.css'

class App extends React.Component{
  constructor (){
    super()
  }
  render () {
    return (
      <Router>
        <MainLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/product" component={Home} />
          <Route exact path="/product-category" component={Home} />
          <Route exact path="/order" component={Home} />
          <Route exact path="/user" component={Home} />
        </Switch>
        </MainLayout>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
