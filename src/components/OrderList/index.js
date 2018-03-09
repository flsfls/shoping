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
      text,
      color,
      fiId,
      fsPurchaseGUID,
      fdPurchaseTotAmt,
      fsSupplierName,
      ifsArrivalDate,
    } = this.props.orderItem;
    return (
      <ul>
        <li className="c_order_list">
          <p className="first flex_lr_sb_c">
            <span>{fsSupplierName}</span>
            <span style={{ color: color }}>{text}</span>
          </p>
          <p className="second flex_lr_sb_c">
            <span>{fsPurchaseGUID}</span>
            <span>{ifsArrivalDate}</span>
          </p>
          <p className="third flex_lr_sb_c">
            <span className="fdPurchaseTotAmt">¥{fdPurchaseTotAmt}</span>
            {
              text === '已提交-已确认' ? <span className="confirm">确认入库</span> : null
            }
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
