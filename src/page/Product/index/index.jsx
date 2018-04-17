import React from 'react'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Breadcrumb from '@/component/Breadcrumb/'
import SearchList from './index-list-search'
import Pagination from '@/util/pagination/'
import TableList from '@/util/table-list/'

import Product from '@/service/product-service'
import Mutil from '@/util/mm'

import './index.scss'

const _mm = new Mutil()
const _product = new Product()

export default class ProductList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      list: [],
      searchKey: '',
      searchValue: ''
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
  // 搜索信息
  onSearchClick (param) {
    //需要重置页码
    this.setState(Object.assign({
      pageNum: 1
    }, param), this.fetchList)
  }

  fetchList () {
    _product.getListInfo({
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum,
      [this.state.searchKey]: this.state.searchValue
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
  
  //处理上下架
  onSetProductStatus (currentStatus, currentProductId,e) {
    e.preventDefault()
    console.log('onSetProductStatus:',currentStatus, currentProductId,e)
    let newStatus = currentStatus === 1 ? 2 : 1
    let confirmTips = currentStatus === 1 ? '确定要下架该商品？' : '确定要上架该商品？'
    if(window.confirm(confirmTips)){
      _product.setProductStatus({
        'productId': currentProductId,
        'status': newStatus
      }).then(
        (data) => {
          _mm.successTip(data.msg)
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
        {name:'id', width:""},
        {name:'信息', width:""},
        {name:'价格', width:""},
        {name:'状态', width:""},
        {name:'操作', width:""}
      ]
    return (
      <div className="content-wrapper">
        <Breadcrumb title="商品管理" stitle="列表页" >
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product/edit" >
             <i className="fa fa-plus"></i> 添加商品
            </Link>
          </div>
        </Breadcrumb>
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">查看所有数据</h3>
                </div>
                <div className="box-body">
                  <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                  <SearchList onSearch={this.onSearchClick.bind(this)} />
                  <div className="row"><div className="col-sm-12">
                    <TableList listLength={this.state.list.length} tableHeads={tableHeads}>
                      {this.state.list.map((item, index) =>
                        (<tr role="row" key={index} className={index%2 ? '' : 'odd'}>
                          <td className="sorting_1">{item.id}</td>
                          <td>{item.name}</td>
                          <td>¥{item.price}</td>
                          <td>
                          <p>{item.status === 1 ? '在售' : '已下架'}</p> 
                          <button onClick={this.onSetProductStatus.bind(this, item.status, item.id)}>{item.status === 1 ? '下架' : '上架'}</button>
                          </td>
                          <td><Link to={`/product/detail/${item.id}`} className="btn btn-confirm">查看</Link><br /><Link to={`/product/edit/${item.id}`}  className="btn btn-confirm">编辑</Link></td>
                        </tr>)
                      )}
                    </TableList>
                  
                  </div></div>
                  <div className="row">
                      <div className="col-sm-6 col-xs-12">
                        <Pagination onChange={this.onChange.bind(this, event)} current={this.state.pageNum} total={this.state.total} pageSize={this.state.pageSize} />
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