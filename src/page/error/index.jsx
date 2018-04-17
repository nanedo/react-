import React from 'react'
import Breadcrumb from '../../component/Breadcrumb/'
import {Link} from 'react-router-dom'

export default class Error extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="content-wrapper">
        <Breadcrumb title="404 错误页面" >
        </Breadcrumb>
        <div className="content">
          <div class="error-page">
            <h2 class="headline text-yellow"> 404</h2>

            <div class="error-content">
              <br />
              <br />
              <h3><i class="fa fa-warning text-yellow"></i> 很不幸! 我们没有你要的页面</h3>
              
              <p className="bg-info">
              也许你可以试试访问首页再找找 <Link to="/">返回首页</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}