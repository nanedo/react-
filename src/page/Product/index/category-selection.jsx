import React from 'react'
import Mutil from '@/util/mm'
import Product from '@/service/product-service'

const _mm = new Mutil()
const _product = new Product()

export default class CategorySelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstList: [],
      firstCategoryId: 0,
      secondList: [],
      secondCategoryId: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId
    let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
    // 数据没有发生变化时不作处理
    if(!categoryIdChange && !parentCategoryIdChange){
      return false
    } 
    // 只有一级品类
    if(nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      })
    } else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory(nextProps.parentCategoryId)
      })
    }
  }

  componentDidMount () {
    this.fetchCategoryList(0,"firstList")
  }
  // 进入页面时，鼠标划过才去请求数据
/*   loadCategory () {
    if(this.state.isFirstTime){
      this.setState({
        isFirstTime: false
      }, this.fetchCategoryList.bind(this,0,'firstList'))
    }
  } */
  // 获取列表数据
  fetchCategoryList(pid, type){
    _product.getCategoryList(pid).then(
      (data) => {
        this.setState({
          [type]: data
        })
      },
      (err) => {
        _mm.errorTip(msg)
      }
    )
  }
  loadSecondCategory(id){
    if(this.state.firstCategoryId){
      this.fetchCategoryList(id, 'secondList')
      // 加载1级分类时传递到父组件
      this.onChangeCategory()
    }
  }
  // 获取二级分类数据
  getSecondCategory (e) {
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0
    // 如果选择了请选择，则去掉后面的二级分类显示
    this.setState({
      secondList: [],
      secondCategoryId: 0,
      firstCategoryId: newValue
    }, () => {
      this.loadSecondCategory(newValue)
    })
  }
  // 选择了2级分类
  onChangeSecondCategory (e) {
    if(this.props.readOnly){
      return;
    }
    // 当选择了2级分类，则之前的2级分类变成1级分类
    this.setState({
      secondCategoryId: e.target.value || 0
    }, this.onChangeCategory)
  }
  // 传递数据到上一级
  onChangeCategory () {
    if(typeof this.props.onGetChangeCategory == 'function'){
      if(this.state.secondCategoryId){
        this.props.onGetChangeCategory({
          categoryId: this.state.secondCategoryId,
          parentCategoryId: this.state.firstCategoryId
        })
      } else {
        this.props.onGetChangeCategory({
          categoryId: this.state.firstCategoryId,
          parentCategoryId: 0
        })
      }
      
    }
  }

  render () {
    return (
      <div className="col-sm-5">
        <select value={this.state.firstCategoryId} 
        readOnly={this.props.readOnly}
        onChange={this.getSecondCategory.bind(this)} className="form-control cate-select " placeholder="所属分类">
          <option value="">请选择一级分类</option>
          {
            this.state.firstList.map((el, index) => <option key={index} value={el.id}>{el.name}</option> )
          }
        </select>

        {this.state.secondList.length ? 
          <select value={this.state.secondCategoryId} 
          readOnly={this.props.readOnly}
          onChange={this.onChangeSecondCategory.bind(this)} className="form-control cate-select cate-select-2 " placeholder="所属分类">
            <option value="">请选择二级分类</option>
            {
              this.state.secondList.map((el, index) => <option key={index} value={el.id}>{el.name}</option> )
            }
          </select>
          : ''
        }
      </div>
    )
  }
}