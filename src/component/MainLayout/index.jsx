import React from 'react'

import TopNav from '../TopNav/'
import SideNav from '../SideNav/'
import MainFoot from '../MainFoot/'

import './index.scss'

class MainLayout extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="wrapper">
        <TopNav />
        <SideNav />
        {this.props.children}
        <MainFoot />
      </div>
    )
  }
}

export default MainLayout