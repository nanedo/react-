import Mutil from '@/util/mm'

const _mm = new Mutil()

class Product {
  // 获取数据
  getListInfo (param) {
    return _mm.request({
      url: '/manage/product/search.do',
      params: param
    })
  }
  // 修改商品的状态
  setProductStatus (param) {
    return _mm.request({
      'url': '/manage/product/set_sale_status.do',
      'method': 'post',
      'data': param
    })
  }


  /* ===============产品分类=================== */
  // 获取分类列表
  // categoryId
  getCategoryList (categoryId=0) {
    return _mm.request({
      method: 'post',
      url: '/manage/category/get_category.do',
      'data': {
        categoryId
      }
    })
  }

  // 增加分类
  addCategory(categoryName, parentId=0) {
    // 如果没有传父id，则改为默认为0
    return _mm.request({
      method: 'post',
      url: '/manage/category/add_category.do',
      data: {
        categoryName,
        parentId
      }
    })
  }

  // 更新修改产品
  saveProduct (data) {
    return _mm.request({
      url:'/manage/product/save.do',
      method: 'post',
      data
    })
  }

  // 获取产品信息
  getProductInfo (productId) {
    return _mm.request({
      url:'/manage/product/detail.do',
      params: {
        productId
      }
    })
  }

  // 检查产品信息
  checkProduct (data) {
    let res = {
      status: 0,
      msg: ''
    }
    // 简单判断各个字段是否正确
    console.log('product data:', data)
    if(data.name === ''){
      return {msg : ('请设置产品名称'),
      status : 1}
    }
    if(data.subtitle === ''){
      return {msg : ('请设置产品副标题'),
      status : 1}
    }
    if(data.categoryId === 0){
      return {msg : ('请设置产品分类'),
      status : 1}
    }
    if(data.subImages.length < 10){
      return {msg : ('请上传产品图片'),
      status : 1}
    }
    if(data.price <= 0){
      return {msg : ('请设置产品价格'),
      status : 1}
    }
    if(data.stock <= 0){
      return {msg : ('请设置产品库存'),
      status : 1}
    }
    if(data.detail.replace(/<p><\/p>/g,'').trim() === ''){
      return {msg : ('请设置产品详情'),
      status : 1}
    }

    return res
  }

}
export default Product