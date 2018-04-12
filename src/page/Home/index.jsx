import React from 'react'
import Breadcrumb from '../../component/Breadcrumb/'
import ProTypes from 'prop-types'

export default class Home extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="content-wrapper">
        <Breadcrumb title="首页" stitle="仪表盘" >
          <button className="btn btn-error">aaaa</button>
        </Breadcrumb>
        <div className="content">
          这是首页
          <button className="btn btn-error">1111</button>
        </div>
      </div>
      
    )
  }
}