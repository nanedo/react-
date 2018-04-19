import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

import PoductList from '@/page/Product/index/'
import PoductDetail from '@/page/Product/index/detail'
import PoductEdit from '@/page/Product/index/edit'

class ProductRouter extends React.Component{
  constructor (){
    super()
  }
  render () {
    return (
        <Switch>
          <Route path="/product/index"  component={PoductList} />
          <Route path="/product/detail/:productid"  component={PoductDetail} />
          <Route path="/product/edit/:productid?"  component={PoductEdit} />
          <Redirect exact from="/product" to="/product/index" />
        </Switch>
    )
  }
}

export default ProductRouter
