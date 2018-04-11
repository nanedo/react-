import React from 'react'
import ReactDOM from 'react-dom'

export default class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date(),
      value: ''
    }
  }

  componentDidMount () {
    this.timer = setInterval(()=>{
      this.tick()
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
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