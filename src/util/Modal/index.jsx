class Modal {

  show (cfg) {
    let _cfg = {
      type: 'default', //  error
      title: '提示',
      desc: '提示信息'
    }
    this.initMoal(Object.assign(_cfg, cfg))
  }

  initMoal (_cfg) {
    // 粗暴点，直接添加、删除dom元素
    this.el = document.createElement('div');
    this.el.innerHTML = `
    <div class="${(_cfg.type === 'error' ? '': '') + " modal fade in"}">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" >
                <span >x</span></button>
              <h4 class="modal-title">${_cfg.title}</h4>
            </div>
            <div class="modal-body">
              <p>${_cfg.type === 'error' ? '<i class="fa fa-exclamation"></i>' : ''} ${_cfg.desc}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">确定</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.el.getElementsByClassName('modal')[0].onclick = this.el.getElementsByClassName('btn-primary')[0].onclick = this.closeBtn = this.el.getElementsByClassName('close')[0].onclick = () => {
      this.onClosePop()
    }
    this.el.getElementsByClassName('modal-dialog')[0].onclick = (e) => {
      e.stopPropagation()
      return false
    }
    document.body.appendChild(this.el)
  }

  onClosePop(){
    this.el.parentNode.removeChild(this.el)
  }
}
export default Modal