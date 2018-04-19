import React from 'react'
import ProTypes from 'prop-types'
import {Link,NavLink} from 'react-router-dom'

import Breadcrumb from '@/component/Breadcrumb/'
import TableList from '@/util/table-list/'

import Product from '@/service/product-service'
import Mutil from '@/util/mm'

const _mm = new Mutil()
const _product = new Product()

class CategoryList extends React.Component {

  constructor (props,context) {
    super(props,context)
    this.state = {
      list: [],
      id: 0
    }
  }

  componentDidMount () {
    let id = this.props.match.params.cid || 0
    this.setState({
      id
    },() => {
      this.fetchList()
    })
  }

  componentDidUpdate(prevProps, prevState){
    let oldPath = prevProps.location.pathname,
        newPath = this.props.location.pathname,
        id   = this.props.match.params.cid || 0;
    if(oldPath !== newPath){
        this.setState({
            id
        }, () => {
          this.fetchList()
        });
    }
  }

  fetchList () {
    return _product.getCategoryList(this.state.id).then(
      (data) => {
        this.setState({
          list: data
        })
      }, 
      (err) => {
        this.setState({
          list: []
        })
        _mm.errorTip(err)
      }
    ).catch(() => {
      this.props.route.history.push('/product-category')
    })
  }

  onChangeName (categoryId, oldName) {
    let categoryName = window.prompt('请输入新的名称', oldName)
    if(categoryName){
      _product.changeCategoryName({
        categoryId,
        categoryName
      }).then(
        (res) => {
          _mm.successTip('更新成功')
          this.fetchList()
        },
        (err) => {
          _mm.errorTip(err)
        }
      )
    }
  }

  render () {
    let tableHeads = [
      {name:'品类ID', width:""},
      {name:'品类名称', width:""},
      {name:'	操作', width:""}
    ]
    return (
      <div className="content-wrapper">
        <Breadcrumb title="品类管理" stitle="列表页" >
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product-category/add" >
             <i className="fa fa-plus"></i> 添加品类
            </Link>
          </div>
        </Breadcrumb>
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">当前商品分类ID：{this.state.id}</h3>
                  {this.state.id !== 0 
                    ? <Link to={`/product-category`}  className="btn btn-confirm"> 返回父级分类</Link>
                    : ''    
                    }
                </div>
                <div className="box-body">
                  <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap"><div className="row"><div className="col-sm-12">
                  <TableList tableHeads={tableHeads} listLength={this.state.list.length} >
                    {this.state.list.map((item, index) =>
                        (<tr role="row" key={index} className={index%2 ? '' : 'odd'}>
                          <td className="sorting_1">{item.id}</td>
                          <td>{item.name}</td>
                          <td><button onClick={this.onChangeName.bind(this, item.id, item.name)} className="btn btn-default">修改名称</button> 
                          {this.state.id === 0 
                          ? <Link to={`/product-category/index/${item.id}`}  className="btn btn-confirm">查看其子品类</Link>
                          : ''    
                          }
                          </td>
                        </tr>)
                      )}
                  </TableList>
                  </div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default CategoryList 