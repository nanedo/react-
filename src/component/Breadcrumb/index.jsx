import React from 'react'
import {Link} from 'react-router-dom'

export default class Breadcrumb extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount  () {
    document.title = this.props.title + ' - Nanedo'
  }

  render () {
    return (
      <section className="content-header">
        <h1>
          {this.props.title}
          <small>{this.props.stitle}</small>
          {this.props.children}
        </h1>
        <ol className="breadcrumb">
          <li><Link to="/"><i className="fa fa-dashboard"></i> Home</Link></li>
          <li className="active">{this.props.title}</li>
        </ol>
      </section>
    )
  }
}

Breadcrumb.defaultProps = {
  title: '后台管理'
}