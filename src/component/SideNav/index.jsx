import React from 'react'
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect, NavLink} from 'react-router-dom'

import './index.scss'

const routerList = [{
        name: '首页',
        to: '/',
        icon: 'fa-home'
      },
      {
        name: '商品',
        to: '/product',
        icon: 'fa-dashboard',
        sub: [
          {
            'name': '商品管理',
            'to': '/product'
          },
          {
            'name': '品类管理',
            'to': '/product-category'
          }
        ]
      },
      {
        name: '订单',
        to: '/order',
        icon: 'fa-shopping-cart',
        sub: [
          {
            'name': '订单管理',
            'to': '/order'
          }
        ]
      },
      {
        name: '用户',
        to: '/user',
        icon: 'fa-user',
        sub: [
          {
            'name': '用户管理',
            'to': '/user'
          }
        ]
      }
    ]

class SideNav extends React.Component {
  constructor (props, context) {
    super(...arguments)
    this.state = {
      collapsed: false
    }
  }

  renderSidebar () {

  }

  render () {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
        {/* <!-- sidebar menu --> */}
        <ul className="sidebar-menu" data-widget="tree">
          <li><NavLink exact to="/" activeClassName="active"><i className="fa fa-home"></i> <span>首页</span></NavLink></li>
          <li className="active treeview menu-open">
            <Link to="/product">
              <i className="fa fa-laptop"></i> <span>商品</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"></i>
              </span>
            </Link>
            <ul className="treeview-menu">
              <li><NavLink to="/product" activeClassName="active"> 商品管理</NavLink></li>
              <li><NavLink to="/product-category" activeClassName="active"> 品类管理</NavLink></li>
            </ul>
          </li>
          <li className="active treeview menu-open">
            <Link to="/order">
              <i className="fa fa-shopping-cart"></i> <span>订单</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"></i>
              </span>
            </Link>
            <ul className="treeview-menu">
              <li><NavLink to="/order" activeClassName="active"> 订单管理</NavLink></li>
            </ul>
          </li>
          <li className="active treeview menu-open">
            <Link to="/user">
              <i className="fa fa-user"></i> <span>用户</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"></i>
              </span>
            </Link>
            <ul className="treeview-menu">
              <li><NavLink to="/user" activeClassName="active"> 用户管理</NavLink></li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
    )
  }
}

export default SideNav