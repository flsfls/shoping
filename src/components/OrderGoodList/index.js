import React from 'react';
import { Icon } from 'antd-mobile';
import './style.less';


class OrderGoodList extends React.Component {
  componentWillUnmount() {
    // will did
  }
  render() {
    return (
      <div className="order_good_list">
        <div className="flex_lr_sb_c">
          <div className="flex_lr_fs_fs">
            <p>1</p>
            <div className="flex_tb_fs_fs">
              <span className="good">带子(北海道)</span>
              <span className="util">1kg／盒</span>
            </div>
          </div>
          <div className="flex_lr_fs_c">
            <div className="flex_lr_fs_c">
              <input placeholder="23" />
              <span className="kg">kg</span>
            </div>
            <Icon type="right" size="lg" color="#C5C5C5" />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderGoodList;
