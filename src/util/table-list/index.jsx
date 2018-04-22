import React from 'react'

class TableList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstTime: true
    }
  }

  componentWillReceiveProps() {
    // 列表只有在第一次挂载的时候为true
    this.setState({
      firstTime: false
    })
  }

  render () {
    let thead = this.props.tableHeads.map((el, index) => {
      if(typeof el ==='object'){
        return (<th key={index} width={el.width}>{el.name}</th>)
      } else if(typeof el ==='string') {
        return (<th key={index}>{el}</th>)
      }
    })
    let listBody = this.props.children
    let listError = (<tr role="row">
      <td className="sorting_1 text-center" colSpan={this.props.tableHeads.length}>{
        this.state.firstTime ? '正在加载中...' : '没有找到你要的信息。'
        }</td>
    </tr>)
    return (
      <table className="table table-bordered table-striped dataTable" role="grid">
        <thead>
          <tr>
            {thead}
          </tr>
        </thead>
        <tbody>
          {this.props.listLength ? listBody : listError}
        </tbody>
        <tfoot>
          {this.props.listLength > 10 &&  (
          <tr>
            {thead}
          </tr>
          )}
        </tfoot>
      </table>
    )
  }
}

export default TableList