import React from 'react'
import ReactDOM from 'react-dom'

export default class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date(),
      value: ''
    }
    console.log('constructor:',1)
  }

  /* componentWillMount(){
    console.log('componentWillMount:',2)
  }

  UNSAFE_componentWillMount(){
    // 17版本以后会用这个方法替代componentWillMount
    console.log('UNSAFE_componentWillMount:',3)
  }
   */
  // if a parent component causes your component to re-render, this method will be called even if props have not changed. 
  /* componentWillReceiveProps () {
    console.log('componentWillReceiveProps:',4)
  }

  UNSAFE_componentWillReceiveProps(){
    // 17版本后用来替代componentWillReceiveProps
    console.log('UNSAFE_componentWillReceiveProps:',5)
  }
 */
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate:',6)
    return true
  }

  /* componentWillUpdate(){
    console.log('componentWillUpdate:',7)
  }
  UNSAFE_componentWillUpdate(){
    // 17版本用来替代componentWillUpdate
    console.log('UNSAFE_componentWillUpdate:',8)
  }
 */

  componentDidUpdate(){
    console.log('componentDidUpdate:',9)
  }
  // error boundaries only catch errors in the components below them in the tree. 
  componentDidCatch(){
    console.log('componentDidCatch:',10)
  }

  componentDidMount () {
    console.log('componentDidMount:',11)
    this.timer = setInterval(()=>{
      // this.tick()
    }, 1000)
  }

  componentWillUnmount () {
    console.log('componentWillUnmount:',12)
    clearInterval(this.timer)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate:',15)
    return prevState
  }

  tick () {
    this.setState({
      date: new Date()
    })
  }

  handleClick () {
    this.props.onNameChange('toms')
  }

  handleInput (e) {
    this.setState({
      value: e.target.value
    })
  }

  render () {
    console.log('render:',13)
    return (
      <div>
        <h3>My clock~{this.props.name}</h3>
        <p>input: {this.state.value}</p>
        <input type="text" onChange={(e)=>this.handleInput(e)} />
        <div> { this.state.date.toLocaleTimeString() } </div>
        <button onClick={this.handleClick.bind(this)}>show my name</button>
      </div>
    )
  }
}

// 如果父级没有传递props时，以这个作为默认值渲染
Clock.defaultProps = {
  name: '默认的名字',
  onNameChange: (...arg) =>{
    console.log(arg)
  }
}
//  if a parent component causes your component to re-render, this method will be called even if props have not changed. 
Clock.getDerivedStateFromProps = (nextProps, prevState) => {
  console.log('静态方法getDerivedStateFromProps:',14)
  return prevState
}