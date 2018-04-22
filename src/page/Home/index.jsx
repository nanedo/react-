import React from 'react'
import Breadcrumb from '../../component/Breadcrumb/'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Statistic from '@/service/statistic-service'

import ChartJs from 'chart.js'
// http://www.chartjs.org/samples/latest/

import './index.scss'

const _statistic = new Statistic()
let chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}

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

  initOrderChart () {

    let orderInfo = {
      0: '已取消',
      10: '未付款',
      20: '已付款',
      40: '已发货',
      50: '交易成功',
      60: '交易关闭'
    }
    let orderData = this.state.order || {}
    var ctx = document.getElementById('charjs').getContext('2d')
        
    var myChart = new ChartJs(ctx, {
      type: 'doughnut',
      data:{
        datasets:[{
          data: [
            orderData[0] || 0,
            orderData[10] || 0,
            orderData[20] || 0,
            orderData[40] || 0,
            orderData[50] || 0,
            orderData[60] || 0
          ],
          backgroundColor:[
            chartColors.grey, 
            chartColors.purple, 
            chartColors.red, 
            chartColors.green, 
            chartColors.orange, 
            chartColors.blue]
        }],
        labels: [
          orderInfo[0],
          orderInfo[10],
          orderInfo[20],
          orderInfo[40],
          orderInfo[50],
          orderInfo[60]
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: false,
          text: '订单汇总分析'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    })
  }

  initProductChart () {
    let productInfo = {
      1: '在售',
      2: '下架',
      3: '删除'
    }
    let productData = this.state.product || {}
    var ctx = document.getElementById('charjs2').getContext('2d')
        
    var myChart = new ChartJs(ctx, {
      type: 'bar',
      data:{
        datasets:[{
          'label': '产品详情',
          data: [
            productData[1] || 0,
            productData[2] || 0,
            productData[3] || 0
          ],
          "fill":false,
          backgroundColor:[
            "rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)"]
        }],
        labels: [
          productInfo[1],
          productInfo[2],
          productInfo[3]
        ]
      },
      options: {'scales': {'yAxes': [{'ticks': {'beginAtZero': true}}]}}
    })
  }

  loadCount () {
    _statistic.getCount().then((data) => {
      this.setState(data, () => {
        this.initProductChart()
        this.initOrderChart()
      })
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
          <div className="row">
            <div className="col-lg-6 col-xs-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <i className="fa fa-bar-chart-o"></i>

                  <h3 className="box-title">订单情况</h3>
                </div>
                <div className="box-body">
                  <div id="donut-chart" style={{"height": "300px"}}>
                    <canvas id="charjs" width="770" height="300"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xs-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <i className="fa fa-bar-chart-o"></i>

                  <h3 className="box-title">商品情况</h3>
                </div>
                <div className="box-body">
                  <div id="donut-chart2" style={{"height": "300px"}}>
                    <canvas id="charjs2" width="770" height="300"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}