import Mutil from '@/util/mm'

const _mm = new Mutil()

class User {
  // 登录
  login (loginInfo) {
    return _mm.request({
      url: '/manage/user/login.do',
      data: loginInfo,
      method: 'post'
    })
  }
  // 检查登录信息
  checkLoginInfo (loginInfo) {
    let username = _mm.trim(loginInfo.username)
    let password = _mm.trim(loginInfo.password)
    if(!username || !password){
      return {
        status: false,
        msg: '用户名或者密码不能为空'
      }
    }
    if(password.length < 6){
      return {
        status: false,
        msg: '密码不能少于6位'
      }
    }

    return {
      status: true,
      msg: ''
    }
  }
  // 获取数据
  getListInfo (param) {
    return _mm.request({
      url: '/manage/user/list.do',
      params: param
    })
  }
}
export default User