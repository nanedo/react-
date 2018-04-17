import React from 'react'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Breadcrumb from '@/component/Breadcrumb/'
import CategorySelction from './category-selection'

import Product from '@/service/product-service'
import Mutil from '@/util/mm'

const _mm = new Mutil()
const _product = new Product()

export default class ProductEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // 商品信息
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
      initialContent: ''
    }
  }

  componentDidMount () {
    // 进入页面时，判断是否为编辑某个产品
    let id = this.props.match.params.productid
    if(id){
      this.loadProductInfo(id)
    }
  }

  loadProductInfo (id) {
    _product.getProductInfo(id).then(
      (data) => {
        data.subImages = data.sub_images.split(',').map(el => {
          return {url: el}
        })
        data.categoryId = data.category_id
        data.initialContent = data.detail
        this.setState(data)
      },
      (err) => {
        _mm.errorTip(err)
        //提示错误，然后自动跳转到产品列表页
        this.props.history.push('/product')
      }
    )
  }

  render () {
    return (
      <div className="content-wrapper manage-product">
        <Breadcrumb title="商品管理" stitle="商品详情" >
        </Breadcrumb>
        <div className="content">
          <div className="box box-warn">
            <div className="form-horizontal">
              <div className="box-body">
                {/* 商品名称 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品名称</label>
  
                  <div className="col-sm-5">
                    <div className="productInfo">{this.state.name}</div>
                  </div>
                </div>
                {/* 商品描述 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品描述</label>
  
                  <div className="col-sm-5">
                    <div className="productInfo">{this.state.subtitle}</div>
                  </div>
                </div>
  
                {/* 所属分类 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">所属分类</label>
  
                  <CategorySelction readOnly={true}
                  categoryId={this.state.categoryId}
                  parentCategoryId={this.state.parentCategoryId} />
                </div>
                {/* 商品价格 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品价格</label>
  
                  <div className="col-sm-5 input-group">
                    <div className="productInfo">¥ {this.state.price} 元</div>
                  </div>
                </div>
                {/* 商品库存 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品库存</label>
  
                  <div className="col-sm-5 input-group">
                    <div className="productInfo"> {this.state.stock} 件</div>
                  </div>
                </div>
                {/* 商品图片 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品图片</label>
  
                  <div className="col-sm-5">
                    <div className="clo-sm-12">
                      {
                        this.state.subImages.length 
                        ? this.state.subImages.map((el, index) => {
                          return <div className="img-thumbnail-box" key={index}><a href={el.url} target="_blank"><img src={el.url} alt="" className="img-thumbnail"/></a></div>
                        })
                        : <div>暂无图片</div>
                      }
                    </div>
                  </div>
                </div>
                {/* 商品详情 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品详情</label>
  
                  <div className="col-sm-5">
                    <div className="detailInfo" dangerouslySetInnerHTML={{__html:this.state.initialContent}}>
                      
                    </div>
                  </div>
                </div>
                {/* 提交按钮 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label"></label>
  
                  <div className="col-sm-5">
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