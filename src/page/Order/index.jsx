import React from 'react'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Breadcrumb from '@/component/Breadcrumb/'
import Pagination from '@/util/pagination/'
import TableList from '@/util/table-list/'

import Order from '@/service/order-service'
import Mutil from '@/util/mm'

import './index.scss'

const _mm = new Mutil()
const _order = new Order()

export default class OrderList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      list: [],
      orderNo: '',
      orderInfo: {
        0: '已取消',
        10: '未付款',
        20: '已付款',
        40: '已发货',
        50: '交易成功',
        60: '交易关闭'
      }
    }
  }

  componentDidMount () {
    this.fetchList()
  }

  onChange (page) {
    this.setState({
      pageNum: page,
    }, this.fetchList)
  }

  onChangePageSize (e) {
    // setState是异步函数
    this.setState({
      pageSize: e.target.value,
      pageNum: 1
    }, this.fetchList)
  }

  fetchList () {
    _order.getListInfo({
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum,
      orderNo: this.state.orderNo
    }).then(
      (data) => {
        this.setState(data)
      }, 
      (err) => {
        this.setState({
          list: []
        })
        _mm.errorTip(err)
      }
    )
  }

  onChangeInput (e) {
    this.setState({
      orderNo: _mm.trim(e.target.value)
    })
  }

  onKeypressDown (e) {
    // 当在输入框按enter键才执行搜索
    if(e.keyCode === 13 ){
      this.fetchList()
    }
  }

  onSendGoods (orderId) {
    if(window.confirm(`是否给订单 ${orderId} 发货？`)){
      _order.sendGoods(orderId).then(
        () => {
          _mm.successTip('已设置为发货')
          this.fetchList()
        },
        (err) => {
          _mm.errorTip(err)
        }
      )
    }
  }


  render () {
    let tableHeads = [
      {name:'订单号', width:""},
      {name:'用户ID', width:""},
      {name:'订单状态', width:""},
      {name:'订单总价', width:""},
      {name:'创建时间', width:""},
      {name:'操作', width:""}
    ]
    return (
      <div className="content-wrapper">
        <Breadcrumb title="订单管理" stitle="列表页" >
        </Breadcrumb>
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">查看所有数据</h3>
                </div>
                <div className="box-body">
                  <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap"><div className="row"><div className="col-sm-6"><div className="dataTables_length" id="example1_length"><label>每页显示 <select name="example1_length" onChange={this.onChangePageSize.bind(this)}  aria-controls="example1" className="form-control input-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> 条</label></div></div><div className="col-sm-6"><div id="example1_filter" className="dataTables_filter"><label>搜索:<input type="search" onKeyUp={this.onKeypressDown.bind(this)} className="form-control input-sm" placeholder="搜索订单" onChange={this.onChangeInput.bind(this)} aria-controls="example1" /></label></div></div></div><div className="row"><div className="col-sm-12">
                  <TableList tableHeads={tableHeads} listLength={this.state.list.length} >
                    {this.state.list.map((item, index) =>
                        (<tr role="row" key={index} className={index%2 ? '' : 'odd'}>
                          <td className="sorting_1">{item.order_no}</td>
                          <td>{item.user_id}</td>
                          <td>{this.state.orderInfo[item.status]}</td>
                          <td>¥{item.payment}</td>
                          <td>{item.create_time}</td>
                          <td><Link to={`/order/detail/${item.order_no}`}  className="btn btn-confirm">查看</Link>
                          {item.status === 20 
                          ? <button onClick={this.onSendGoods.bind(this, item.order_no)} className="btn btn-default">确认发货</button>
                          : ''
                           }
                          </td>
                        </tr>)
                      )}
                  </TableList>
                  </div></div>
                  <div className="row">
                      <div className="col-sm-6 col-xs-12">
                        <Pagination onChange={this.onChange.bind(this)} current={this.state.pageNum} total={this.state.total} pageSize={this.state.pageSize} />
                      </div>
                      <div className="col-sm-6 col-xs-12">
                        <div className="dataTables_info" id="example1_info" role="status" aria-live="polite">共{this.state.total}条数据</div>
                      </div>
                    </div>
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