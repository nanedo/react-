import React from 'react'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Breadcrumb from '@/component/Breadcrumb/'
import TableList from '@/util/table-list/'

import Order from '@/service/order-service'
import Mutil from '@/util/mm'

const _mm = new Mutil()
const _order = new Order()

export default class orderEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // 订单信息
      id: '',
      name: '',
      subtitle: '',
      stock: 0,
      price: 0,
      detail: '',
      status: 1, //默认1
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      //其它信息
      maxUploadNum: 5,
      currentImage: {},
      localImages: [],
      htmlContent: '',
      initialContent: '',
      order_item: [],
      ship:{
        receiver_name: ''
      },
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
    // 进入页面时，判断是否为编辑某个产品
    let id = this.props.match.params.orderid
    if(id){
      this.loadOrderInfo(id)
    }
  }

  loadOrderInfo (id) {
    _order.getOrderInfo(id).then(
      (data) => {
        this.setState(data)
      },
      (err) => {
        _mm.errorTip(err)
        //提示错误，然后自动跳转到产品列表页
        this.props.history.push('/order')
      }
    )
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
      {name:'商品图片', width:""},
      {name:'商品信息', width:""},
      {name:'单价', width:""},
      {name:'数量', width:""},
      {name:'合计', width:""}
    ]
    return (
      <div className="content-wrapper manage-order">
        <Breadcrumb title="订单管理" stitle="订单详情" >
        </Breadcrumb>
        <div className="content">
          <div className="box box-warn">
            <div className="form-horizontal">
              <div className="box-body">
                {/* 订单名称 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">订单号</label>
  
                  <div className="col-sm-5">
                    <div className="orderInfo">{this.state.order_no}</div>
                  </div>
                </div>
                {/* 订单描述 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">创建时间</label>
  
                  <div className="col-sm-5">
                    <div className="orderInfo">{this.state.create_time}</div>
                  </div>
                </div>
  
                {/* 所属分类 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">收件人</label>

                  <div className="col-sm-5">
                  <div className="orderInfo">{this.state.ship.receiver_name}</div>
                  </div>
                </div>
                {/* 订单价格 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">订单状态</label>
  
                  <div className="col-sm-5">
                    <div className="orderInfo">{this.state.orderInfo[this.state.status]} {
                      this.state.status === 20 ? <button onClick={this.onSendGoods.bind(this, this.state.order_no)} className="btn btn-default">确认发货</button>
                      : ''
                    }</div>
                  </div>
                </div>
                {/* 订单库存 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">支付方式</label>
  
                  <div className="col-sm-5">
                    <div className="orderInfo"> {this.state.payment_type === 1 ? '在线支付' : '货到付款'} </div>
                  </div>
                </div>
                {/* 订单图片 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">订单金额</label>
  
                  <div className="col-sm-5">
                    <div className="orderInfo">¥ {this.state.payment} 元</div>
                  </div>
                </div>
                {/* 订单详情 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品详情</label>
                  <div className="detailInfo2 col-sm-5">
                  <TableList tableHeads={tableHeads} listLength={this.state.order_item.length} >
                    {this.state.order_item.map((item, index) =>
                        (<tr role="row" key={index} className={index%2 ? '' : 'odd'}>
                          <td className="sorting_1"><img src={item.product_image} /></td>
                          <td>{item.product_name}</td>
                          <td>¥{item.current_unit_price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.total_price}</td>
                        </tr>)
                      )}
                  </TableList>
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