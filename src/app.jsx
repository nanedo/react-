import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

import Home from './page/Home/'
import UserList from './page/User/'
import OrderList from './page/Order/'
import OrderDetail from './page/Order/detail'
import CategoryEdit from '@/page/Product/category/add'
import CategoryList from '@/page/Product/category/'
import ProductRouter from './page/Product/router.jsx'
import Login from './page/Login/'
import ErrorPage from './page/Error/'
import MainLayout from './component/MainLayout/'

import './css/AdminLTE.css'

class App extends React.Component{
  constructor (){
    super()
  }
  render () {
    let LayoutRoute = (<MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/product-category/add"  component={CategoryEdit} />
        <Route path="/product-category/index/:cid?"  component={CategoryList} />
        <Redirect  from="/product-category" to="/product-category/index" />
        <Route  path="/product" component={ProductRouter} />
        <Route exact path="/order" component={OrderList} />
        <Route exact path="/order/detail/:orderid" component={OrderDetail} />
        <Route path="/user/index" component={UserList} />
        <Redirect exact from="/user" to="/user/index"  />
        <Route component={ErrorPage} />
      </Switch>
    </MainLayout>)
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" render={props => LayoutRoute } />
        </Switch>
        
      </Router>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)
