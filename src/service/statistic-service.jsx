import Mutil from '@/util/mm'

const _mm = new Mutil()

class Statistic {
  // 获取统计信息
  getCount () {
    return _mm.request({
      url: '/manage/statistic/base_count.do'
    })
  }
}

export default Statistic