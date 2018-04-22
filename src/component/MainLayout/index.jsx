import React from 'react'

import Mutil from '@/util/mm'

import TopNav from '../TopNav/'
import SideNav from '../SideNav/'
import MainFoot from '../MainFoot/'

import './index.scss'

const _mm = new Mutil()

class MainLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    window.addEventListener('load', () => {
      document.body.classList.remove('hold-transition')
    })
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