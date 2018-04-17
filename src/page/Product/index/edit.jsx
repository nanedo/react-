import React from 'react'
import ProTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Breadcrumb from '@/component/Breadcrumb/'
import CategorySelction from './category-selection'

import Product from '@/service/product-service'
import Mutil from '@/util/mm'
import FileUploader from '@/util/file-uploader/'
import RichEditor from '@/util/rich-editor/'

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
        console.log('product info: ', data)
        data.subImages = data.sub_images.split(',').map(el => {
          return {url: el}
        })
        data.categoryId = data.category_id
        data.initialContent = data.detail
        this.setState(data,()=>{
          console.log("this.state: ",this.state)
        })
      },
      (err) => {
        _mm.errorTip(err)
        //提示错误，然后自动跳转到产品列表页
        this.props.history.push('/product')
      }
    )
  }

  onSetCategoryId (categoryObj) {
    console.log('选择了类：', categoryObj)
    this.setState(categoryObj)
  }
  // 删除指定链接的图片
  onDeleteImage (url) {
    this.setState({
      subImages: this.state.subImages.filter(el => el.url!==url),
      localImages: this.state.localImages.filter(el => el.url!==url)
    })
  }
  // 选中的图片
  onBeforeUpload (file) {
    let info = {
      status: 0,
      msg: ''
    }
    if(this.state.subImages.length >= this.state.maxUploadNum){
      info.status = 1
      info.msg = `每个产品最多有${this.state.maxUploadNum}张图片`
      return info
    }
    let hasIt = this.state.localImages.some(el => {
      // 简单检查名称跟大小是否相同
      // lastModified
      return el.name === file.name && el.size === file.size
    })
    if(hasIt){
      info.status = 1
      info.msg = `上传重复图片`
      return info
    } else {
      this.state.localImages.unshift({
        name: file.name,
        size: file.size,
        lastModified: file.lastModified
      })
      this.setState({
        localImages: this.state.localImages,
        currentImage: this.state.localImages[0]
      })
      return info
    }
  }

  onUploadSuccess (res) {
    // 成功上传后，清除当前上传图片对象，并关联服务器图片跟本地图片
    // 实际俩个对象可以合并一起
    let currentImage = this.state.currentImage
    currentImage.url = res.url
    this.state.localImages[0] = currentImage

    this.state.subImages.push(res)
    this.setState({
      subImages: this.state.subImages,
      localImages: this.state.localImages,
      currentImage: {}
    })
  }

  onUploadFail (err) {
    this.state.localImages.shift()
    this.setState({
      localImages: this.state.localImages,
      currentImage: {}
    })
    _mm.errorTip(err)
  }

  // 获取编辑器的html代码
  getHtmlContent (htmlContent) {
    this.setState({
      detail: htmlContent
    })
    console.log('htmlContent: ',htmlContent)
  }

  onValueChange (e) {
    let name = e.target.name
    let value = e.target.value.trim()

    this.setState({
      [name]: value
    })
  }

  getSubImageData () {
    return this.state.subImages.map(image => image.url).join(',')
  }

  onSubmitForm (e) {
    e.preventDefault()
    let data = {
      name:this.state.name, 
      subtitle:this.state.subtitle,
      categoryId:parseInt(this.state.categoryId, 10),
      parentCategoryId:parseInt(this.state.parentCategoryId, 10),
      subImages:this.getSubImageData(),
      price:parseFloat(this.state.price, 10),
      stock:parseInt(this.state.stock, 10),
      status:parseInt(this.state.status, 10),
      detail:this.state.detail,
      id:this.state.id
    }

    let checkRes = _product.checkProduct(data)
    
    if(checkRes.status === 0){
      _product.saveProduct(data).then(
        (data) => {
          _mm.successTip(data)
          // 提示完后跳转到列表页
          this.props.history.push('/product')
        },
        (err) => {
          _mm.errorTip(err)
        }
      )
    } else {
      _mm.errorTip(checkRes.msg)
    }
  }

  render () {
    return (
      <div className="content-wrapper manage-product">
        <Breadcrumb title="商品管理" stitle="编辑商品" >
        </Breadcrumb>
        <div className="content">
          <div className="box box-warn">
            <div className="form-horizontal">
              <div className="box-body">
                {/* 商品名称 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品名称</label>
  
                  <div className="col-sm-5">
                    <input type="text" 
                    onChange={this.onValueChange.bind(this)} 
                    name="name" 
                    value={this.state.name}
                    className="form-control" placeholder="请输入商品名称" />
                  </div>
                </div>
                {/* 商品描述 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品描述</label>
  
                  <div className="col-sm-5">
                    <input type="text" onChange={this.onValueChange.bind(this)} name="subtitle"
                    value={this.state.subtitle}
                    className="form-control" placeholder="请输入商品描述" />
                  </div>
                </div>
  
                {/* 所属分类 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">所属分类</label>
  
                  <CategorySelction 
                  categoryId={this.state.categoryId}
                  parentCategoryId={this.state.parentCategoryId}
                  onGetChangeCategory={this.onSetCategoryId.bind(this)} />
                </div>
                {/* 商品价格 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品价格</label>
  
                  <div className="col-sm-5 input-group">
                    <input type="number" onChange={this.onValueChange.bind(this)} name="price"
                    value={this.state.price}
                    className="form-control" placeholder="请输入商品价格" />
                    <span className="input-group-addon">元</span>
                  </div>
                </div>
                {/* 商品库存 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品库存</label>
  
                  <div className="col-sm-5 input-group">
                    <input type="number" onChange={this.onValueChange.bind(this)} name="stock"
                    value={this.state.stock} className="form-control" placeholder="请输入商品库存" />
                    <span className="input-group-addon">件</span>
                  </div>
                </div>
                {/* 商品图片 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品图片</label>
  
                  <div className="col-sm-5">
                    <FileUploader beforeUpload={this.onBeforeUpload.bind(this)} onUploadSuccess={this.onUploadSuccess.bind(this)} onUploadFail={this.onUploadFail.bind(this)} />
                    <div className="clo-sm-12">
                      {
                        this.state.subImages.length 
                        ? this.state.subImages.map((el, index) => {
                          return <div className="img-thumbnail-box" key={index}><img src={el.url} alt="" className="img-thumbnail"/><i onClick={this.onDeleteImage.bind(this, el.url)} className="fa fa-close"></i></div>
                        })
                        : <div>请上传图片</div>
                      }
                    </div>
                  </div>
                </div>
                {/* 商品详情 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label">商品详情</label>
  
                  <div className="col-sm-5">
                    <RichEditor contentFormat="html" contentId={this.state.id} initialContent={this.state.initialContent} getHtmlContent={this.getHtmlContent.bind(this)} />
                  </div>
                </div>
                {/* 提交按钮 */}
                <div className="form-group">
                  <label className="col-sm-2 control-label"></label>
  
                  <div className="col-sm-5">
                    <button onClick={this.onSubmitForm.bind(this)} className="btn btn-primary">提交</button>
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