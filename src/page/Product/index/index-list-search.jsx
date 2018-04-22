import React from 'react'
import Mutil from '@/util/mm'

const _mm = new Mutil()

export default class ProductSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageSize: 10,
      searchKey: 'productId',
      searchValue: ''
    }
  }

  onValueChange (e) {
    let name = e.target.name
    let value = e.target.value.trim()
    this.setState({
      [name]: value
    }, () => {
      //当更改列表每页数量时，即时请求
      if(name === 'pageSize'){
        this.fetchList()
      }
    })
  }

  fetchList () {
    this.props.onSearch(this.state)
  }

  onSearchKeyUp (e) {
    // 当在输入框按enter键才执行搜索
    if(e.keyCode === 13 ){
      this.fetchList()
    }
  }
  onSearchClick (e) {
    if(this.state.searchValue){
      this.fetchList()
    } else {
      _mm.errorTip('请输入点什么吧~')
    }
  }
  render () {
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="dataTables_length" id="example1_length"><label>每页显示 <select name="pageSize" onChange={this.onValueChange.bind(this)} className="form-control input-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> 条</label></div>
        </div>
        <div className="col-sm-6">
          <div id="example1_filter" className="dataTables_filter">
            <select name="searchKey" onChange={this.onValueChange.bind(this)}  className="form-control input-sm"><option value="productId">按商品id查询</option><option value="productName">按商品名称查询</option></select>
                    <label><input type="search" name="searchValue" onKeyUp={this.onSearchKeyUp.bind(this)} className="form-control input-sm" placeholder="关键词" onChange={this.onValueChange.bind(this)} /></label><button type="button" onClick={this.onSearchClick.bind(this)} className="btn btn-primary">查询</button></div>
                    </div>
      </div>
    )
  }
}