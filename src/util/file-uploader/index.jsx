import React from 'react'
import FileUpload from './FileUpload.jsx'

export default class FileUplader extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    /*set properties*/
    let beforeUpload = this.props.beforeUpload
    let onUploadFail = this.props.onUploadFail
    let onUploadSuccess = this.props.onUploadSuccess
    const options={
      baseUrl:'/manage/product/upload.do',
      numberLimit: 5,
      fileFieldName: 'upload_file',
      chooseAndUpload: true,
      uploadSuccess: (res) => {
        if(res.status === 0) {
          onUploadSuccess(res.data)
        } else {
          options.uploadFail(res.msg)
        }
      },
      uploadError: (err) => {
        options.uploadFail(err)
      },
      uploadFail: (err) => {
        typeof err !== 'string' && (err = err.msg)
        if(err == 'undefined' || err == undefined) err = '未知错误'
        onUploadFail(`上传失败，${err}`)
      },
      beforeUpload (files,mill) {
        // 默认只处理单个的情况
        const file = files[0],
           dataUrl = window.URL.createObjectURL(file),
            { name, size, lastModified } = file

        let msg = ''
        if( size > (1 * 1024 * 1024) ) {
          msg = '最大支持1MB大小的文件'
        }
        if(!/\.(jpe?g|png|gif|webp)$/i.test(name)) {
          msg = '只支持图片格式（jpg, png, gif, webp）文件'
        }
        // 上传前检测 是否有重复图片 超出最大上传数等限制
        if(typeof beforeUpload === 'function'){
          let detectInfo = beforeUpload(file)
          if(detectInfo.status !== 0){
            msg = detectInfo.msg
          }
        }
        if(msg){
          this.uploadFail(msg)
          return false
        }else{
          return true
        }

      }
    }
    /*Use FileUpload with options*/
    /*Set two dom with ref*/
    return (
      <FileUpload options={options} ref="fileUpload">
        <button ref="chooseAndUpload">选择文件</button>
      </FileUpload>
    )	        
  }
}
