import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'font-awesome/css/font-awesome.min.css'

let style = {
  fontSize: '100px',
  color: 'blue'
}

let name = "nanedo"
let arr = [1, 2, 3]

let myjsx = (
<div>
  <h1 className="mylo">hello6 { Math.random() > 0.5 ? name : (<h3>abcde</h3>)}</h1>
  <h2 style={style}>23424324</h2>
  <i className="fa fa-bath"></i>
  <ul>
  { arr.map((item, index) => (<li key={index}> {item} </li>) )}
  </ul>
</div>
);



ReactDOM.render(
  myjsx,
  document.getElementById('root')
)
