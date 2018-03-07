import React from 'react';
import './style.less';

class OrderGoodButton extends React.Component {
  componentWillUnmount() {
    // will
  }
  render() {
    return (
      <div className="order_good_button flex_lr_sb_c">
        <p className="flex_lr_fs_c">
          <span>共3款</span>
          <span>合计:</span>
          <span>¥1200。00</span>
        </p>
        <button>
          确认
        </button>
      </div>
    );
  }
}

export default OrderGoodButton;
