import Mutil from '@/util/mm'

const _mm = new Mutil()

class Order {
  // 获取统计信息
  getListInfo () {
    return _mm.request({
      url: '/manage/order/list.do'
    })
  }
}

export default Order