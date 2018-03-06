import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
import { formatDateTime } from '@util/common';
/* eslint-disable */
import './style.less';

class OrderList extends React.Component {
  componentWillMount() {
    // will
  }
  render() {
    const {
      info,
      money,
      orderId,
      shopName,
      time,
    } = this.props.orderItem;
    return (
      <ul>
        <li className="c_order_list">
          <p className="first flex_lr_sb_c">
            <span>{shopName}</span>
            <span>{info}</span>
          </p>
          <p className="second flex_lr_sb_c">
            <span>{orderId}</span>
            <span>{formatDateTime(time, 'dot')}</span>
          </p>
          <p className="third flex_lr_sb_c">
            <span>确认入库</span>
            <span>¥{money}</span>
          </p>
        </li>
      </ul>
    );
  }
}

OrderList.propTypes = {
  orderItem: PropTypes.object.isRequired,
};

export default OrderList;
