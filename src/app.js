import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Clock from './Clock.jsx'

import './index.scss'
import 'font-awesome/css/font-awesome.min.css'

// 函数式声明组件
function MyComponent () {
  
  return (
    <div>
      wo de mei li 
    </div>
  )
}

class Child1 extends React.Component {
  constructor(){
    super()
  }
  handleChangeName2 () {
    this.props.onNameChange("被兄弟干了")
  }
  render () {
    return (
      <div>
        <Clock />
        <button onClick={this.handleChangeName2.bind(this)}>改兄弟组件的值</button>
      </div>
    )
  }
}

// es6方式声明组件
class TheComponent extends React.Component {
  // 需要使用到this；使用到props时，必须调用super（）
  constructor () {
    super()
    this.state = {
      name: 'nanedo'
    }
  }
  handleChangeName(val){
    this.setState({
      name: val
    })
  }
  render () {
    return (
      <div>
        <h2>111111111</h2>
        {this.props.children}
        <Clock name={this.state.name} onNameChange={(e)=>this.handleChangeName(e)} />
        <Child1 onNameChange={(e)=>this.handleChangeName(e)} />
      </div>
    )
  }
}
// 样式赋值
let style = {
  fontSize: '100px',
  color: 'blue'
}

let name = "nanedo"
let arr = [1, 2, 3]

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

let myjsx = (
  <Router>
<div>
  <h1 className="mylo">hello6 { Math.random() > 0.5 ? name : (<span>abcde</span>)}</h1>
  <h2 style={style}>23424324</h2>
  <i className="fa fa-bath"></i>
  {/* 遍历数组 */}
  <ul>
  { arr.map((item, index) => (<li key={index}> {item} </li>) )}
  </ul>
  <ul>
      <li>
        <Link to="/dist/index">Home</Link>
      </li>
      <li>
        <Link to="/dist/about" exact >About</Link>
      </li>
      <li>
        <Link to="/dist/topics">Topics</Link>
      </li>
    </ul>
  <Route 
    exact 
    path="/dist/index" 
    render={(props) => (
      <Child1 {...props} onNameChange={(e)=>alert(e)}  />
    )} 
  />
  <Route path="/dist/about" component={TheComponent} />
  <Route path="/dist/topics" component={Topics} />
</div>
</Router>
);

ReactDOM.render(
  myjsx,
  document.getElementById('root')
)
