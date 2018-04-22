import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import Mutil from '@/util/mm'
import axios from 'axios'

const _mm = new Mutil()

export default class RichEditor extends React.Component {

  constructor ( props){
    super(props)
    this.state = {
      htmlContent: ''
    }
  }

  handleHTMLChange (htmlContent) {
    this.setState({
      htmlContent
    })
    this.props.getHtmlContent(htmlContent)
  }
  

  render() {
    const editorProps = {
      contentId: this.props.contentId,
      contentFormat: 'html', // html raw
      placeholder: '请输入相关信息~',
      initialContent: this.props.initialContent || '', // 用来初始化内容
      onHTMLChange: this.handleHTMLChange.bind(this),
      viewWrapper: '.demo',
      media: {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        video: false, // 开启视频插入功能
        audio: false, // 开启音频插入功能
        validateFn: (file) => {
          // 需小于1MB
          return file.size < 1024 * 1024
        }, // 指定本地校验函数，说明见下文
        uploadFn: (param) => {
          const fd = new FormData()
          fd.append('upload_file', param.file, param.file.name)
          //fd.append('file', param.file, param.file.name)
          // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
          console.log(param.libraryId, param)

          _mm.request({
            url: '/manage/product/upload.do',
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'},
            data: fd,
            onUploadProgress: function (progressEvent) {
              // 对原生进度事件的处理
              param.progress(progressEvent.loaded / progressEvent.total * 100)
            }
          }).then(
            (data) => {
              param.success({
                url: data.url
              })
            },
            (err) => {
              param.error({
                msg: err
              })
              // _mm.errorTip(err)
            }
          )
        }, // 指定上传函数，说明见下文
        removeConfirmFn: (param) => {
          // 调用原生confirm对话框
          if (confirm('确认删除这个文件么?')) {
            // 告知编辑器确认删除文件
            param.confirm()
          } 
        }, // 指定删除前的确认函数，说明见下文
        onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
        onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
        onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
      },
      // 增加自定义预览按钮
      extendControls: [
        {
          type: 'split',
        },
        {
          type: 'button',
          text: '预览',
          className: 'preview-button',
          onClick: () => {
            window.open().document.write(this.state.htmlContent)
          }
        },/*  {
          type: 'dropdown',
          text: <span>下拉菜单</span>,
          component: <h1 style={{width: 200, color: '#ffffff', padding: 10, margin: 0}}>Hello World!</h1>
        }, */ {
          type: 'modal',
          text: <span style={{paddingRight: 10,paddingLeft: 10}}> <i className="fa fa-info"></i>帮助信息</span>,
          className: 'modal-button',
          modal: {
            id: 'test-modal',
            title: '帮助信息',
            showClose: true,
            showCancel: true,
            showConfirm: true,
            confirmable: true,
            onConfirm: () => console.log(1),
            onCancel: () => console.log(2),
            onClose: () => console.log(3),
            children: (
              <div style={{width: 480, height: 320, padding: 30}}>
                <a href="https://github.com/margox/braft-editor/blob/master/README.md" target="_blank">编辑器相关文档</a>
                <p>
                  官方demo示例：
                  http://margox.github.io/braft-editor/
                </p>
              </div>
            )
          }
        }
      ]
    }

    return (
      <div className="demo" style={{'border': '1px solid #ccc'}}>
        <BraftEditor {...editorProps} />
      </div>
    )

  }

}