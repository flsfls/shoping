import React from 'react';
/* eslint-disable */
import { get } from '@util/http';
import OrderNavBar from '@components/OrderNavBar';
import OrderList from '@components/OrderList';
import SlideBar from './component/slideBar';
/* eslint-disable */
import './assets/style.less';

class PruchaseOrder extends React.Component {
  state = {
    orderList: [],
    open: false,
  }

  componentDidMount() {
    get('api/order/getOrder').then(({ data }) => {
      const newData = data.map(({
        money,
        shopName,
        orderId,
        recevieTime,
        isUp,
        isShop,
        _id,
      }) => {
        let info;
        if (isUp === 1 && isShop === 1) {
          info = '已提交-待确认';
        }
        return {
          id: _id,
          info,
          money,
          orderId,
          shopName,
          time: recevieTime,
        };
      });
      this.setState({
        orderList: newData,
      });
    });
  }

  onOpenChange = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div className="purchaseOrder inner_body">
        <OrderNavBar
          onOpenChange = {this.onOpenChange}
          placeholder="供应商 单号 单据日期"
        />
        <div>
          {
            this.state.orderList.map(item => (
              <OrderList orderItem={item} key={item.id} />
            ))
          }
        </div>
        <SlideBar open={this.state.open} onOpenChange={this.onOpenChange} />
      </div>
    );
  }
}

export default PruchaseOrder;

