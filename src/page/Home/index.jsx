import React from 'react'
import Breadcrumb from '../../component/Breadcrumb/'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Statistic from '@/service/statistic-service'

const _statistic = new Statistic()

export default class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      productCount: '-',
      orderCount: '-',
      userCount: '-'
    }
  }

  componentDidMount () {
    this.loadCount()
  }

  loadCount () {
    _statistic.getCount().then((data) => {
      this.setState(data)
    }, (err) => {
      _mm.errorTip(err)
    })
  }

  render () {
    return (
      <div className="content-wrapper">
        <Breadcrumb title="首页" stitle="仪表盘" >
        </Breadcrumb>
        <div className="content">
          <div className="row">
            <div className="col-lg-4 col-xs-12">
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>{this.state.productCount}</h3>
                  <p>商品总数</p>
                </div>
                <div className="icon">
                  <i className="fa fa-laptop"></i>
                </div>
                <Link to="/product" className="small-box-footer">查看更多 <i className="fa fa-arrow-circle-right"></i></Link>
              </div>
            </div>
            <div className="col-lg-4 col-xs-12">
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>{this.state.orderCount}</h3>

                  <p>订单总数</p>
                </div>
                <div className="icon">
                  <i className="fa  fa-shopping-cart"></i>
                </div>
                <Link to="/order" className="small-box-footer">查看更多 <i className="fa fa-arrow-circle-right"></i></Link>
              </div>
            </div>
            <div className="col-lg-4 col-xs-12">
              <div className="small-box bg-blue">
                <div className="inner">
                  <h3>{this.state.userCount}</h3>

                  <p>用户总数</p>
                </div>
                <div className="icon">
                  <i className="fa fa-user"></i>
                </div>
                <Link to="/user" className="small-box-footer">查看更多 <i className="fa fa-arrow-circle-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}