import React from 'react'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Breadcrumb from '@/component/Breadcrumb/'

import Product from '@/service/product-service'
import Mutil from '@/util/mm'

const _mm = new Mutil()
const _product = new Product()

export default class CategoryListAdd extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: 0,
      name: '',
      list: []
    }
  }

  componentDidMount () {
    this.fetchList()
  }

  onValueChange (e) {
    let name = e.target.name
    let value = e.target.value.trim()

    this.setState({
      [name]: value
    })
  }

  fetchList () {
    _product.getAllCategoryList().then(
      (list) => {
        this.setState({
          list
        })
      }, 
      (err) => {
        this.setState({
          list: []
        })
        _mm.errorTip(err)
      }
    )
  }

  onSubmitInfo () {
    if(!this.state.name){
      _mm.errorTip('请输入品类名称')
      return false
    }
    _product.addCategory(this.state.name, this.state.id).then(() => {
      _mm.successTip('添加成功')
      this.props.history.push('/product-category')
    }).catch((err)=>{
      _mm.errorTip(err)
    })
  }


  render () {
    return (
      <div className="content-wrapper">
        <Breadcrumb title="品类管理" stitle="列表页" >
        </Breadcrumb>
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">添加新的分类</h3>
                </div>
                <div className="box-body form-horizontal">
                <div className="form-group">
                  <label className="col-sm-2 control-label">所有分类</label>
  
                  <div className="col-sm-5">
                    <select name="example1_length" name="id" onChange={this.onValueChange.bind(this)}  aria-controls="example1" className="form-control input-md">
                    <option value="0">所有/</option>
                    {
                      this.state.list.map(el => {
                        return (
                          <option key={el.id} value={el.id}>所有/{el.name}</option>
                        )
                      })
                    }</select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">品类名称</label>
  
                  <div className="col-sm-5">
                  <input type="text" 
                    onChange={this.onValueChange.bind(this)} 
                    name="name" 
                    className="form-control" placeholder="请输入品类名称" />
                  </div>
                </div>
                <div className="form-group ">
                  <label className="col-sm-2 control-label"></label>
  
                  <div className="col-sm-5">
                    <button onClick={this.onSubmitInfo.bind(this)} className="btn primary">提交</button>
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