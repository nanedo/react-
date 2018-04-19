import Mutil from '@/util/mm'

const _mm = new Mutil()

class Order {
  // 获取统计信息
  getListInfo (params) {
    return _mm.request({
      url: '/manage/order/list.do',
      params
    })
  }

  getOrderInfo(orderNo){
    return _mm.request({
      url: '/manage/order/detail.do',
      params: {
        orderNo
      }
    })
  }

  sendGoods(orderNo){
    return _mm.request({
      url: '/manage/order/send_goods.do',
      method: 'post',
      data: {
        orderNo
      }
    })
  }
}

export default Order