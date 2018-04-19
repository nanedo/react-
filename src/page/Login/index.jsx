import React from 'react'
import User from '@/service/user-service'
import Mutil from '@/util/mm'

const _mm = new Mutil()
const _user = new User()

import './index.scss'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      remember: false,
      redirect: _mm.getUrlParam('redirect') || ''
    }
  }
  // 处理输入值
  onHandleInput (e) {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }
  // 处理勾选状态
  onSaveLogin (e) {
    this.setState({
      'remember': e.target.checked
    })
  }

  // 处理表单
  onSubmitTheForm (e) {
    console.log('press submit')
    e.preventDefault()
    let info = {
      password: this.state.password,
      username: this.state.username,
      savelogin: this.state.remember
    }
    let check = _user.checkLoginInfo(info)

    if(check.status){
      _user.login(info)
      .then((res) => {
        // 25分钟后过期
        _mm.setStorage('userInfo', res, 25)
        this.props.history.push(this.state.redirect)
      }, err => {
        _mm.errorTip(err)
      })
    } else {
      _mm.errorTip(check.msg)
    }
    
  }

  // 优化登录，当为enter键时，自动登录
  handleKeyPress (e) {
    console.log('press enter')
    if(e.keyCode === 13){
      this.onSubmitForm()
    }
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="box box-info">
            <div className="box-header with-border">
              <h3 className="box-title">欢迎登录Nanedo系统</h3>
            </div>
            <form className="form-horizontal">
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="inputEmail3" className="col-sm-2 control-label">用户名</label>

                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="inputEmail3"
                      name="username" 
                      key="p2"
                      onChange={this.onHandleInput.bind(this)}
                      placeholder="请输入用户名"
                     />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword3" className="col-sm-2 control-label">密码</label>

                  <div className="col-sm-10">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="inputPassword3" 
                      name="password"
                      placeholder="请输入密码" 
                      key="p1"
                      onKeyPress={this.handleKeyPress.bind(this)}
                      onChange={this.onHandleInput.bind(this)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" name="remember" onChange={this.onSaveLogin.bind(this)} /> 记住我 <p className="bg-info"><i className="fa fa-info-circle"></i>(浏览器将会保存24小时的登录状态)</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-footer">
                <button 
                onClick={this.onSubmitTheForm.bind(this)}
                className="btn btn-info pull-right btn-block">Sign in</button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Login