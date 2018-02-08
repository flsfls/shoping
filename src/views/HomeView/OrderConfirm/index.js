import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd-mobile';
import { Link, Route } from 'react-router-dom';
import ComfirmButton from './component/comfirmButton';
import ReceiveAddress from '../ReceiveAddress';
import ShopList from '../ShopList';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  goodStore: store.goodStore,
  infoStore: store.infoStore,
})) @observer
class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    const nowTimeStamp = Date.now();
    const now = new Date(nowTimeStamp);
    this.state = {
      date: now,
    };
  }

  componentWillMount() {
    const { goodStore } = this.props.goodStore;
    let countOrder = 0;
    let money = 0;
    goodStore.forEach((good) => {
      if (good.get('check') === true) {
        countOrder += 1;
      } else {
        const isInnerChecked = good.get('material').some(materialItem => materialItem.get('check') === true);
        if (isInnerChecked) {
          countOrder += 1;
        }
      }
      good.get('material').forEach((materialItem) => {
        if (materialItem.get('check') === true) {
          money += materialItem.get('count') * materialItem.get('money');
        }
      });
    });
    this.countOrder = countOrder;
    this.money = money;
  }

  goReceiveAddress = (id) => {
    sessionStorage.id = '5a7a8fd1ea4fafc71e85d2c0';
    this.props.history.push('/home/shopCard/orderConfirm/recevieAddress', {
      id,
    });
  }

  render() {
    const OrderDate = ({ extra, onClick }) => (
      <div onClick={onClick} className="flex_lr_sb_c list_item">
        <span>到货日期</span>
        <div className="flex_lr_sb_c">
          <span className="item">{extra}</span>
        </div>
      </div>
    );
    const {
      _id,
      address,
      shopName,
      telephone,
    } = this.props.infoStore.initAddress.toJS();
    return (
      <div className="inner_body order_confirm">
        <HomeNavBar path="/home/shopCard" title="订单确认" />
        <div className="orderConfirm_container">
          <div className="flex_lr_sb_c orderConfirm_address" onClick={() => this.goReceiveAddress(_id)}>
            <div className="address_info">
              <p>
                <span className="name">{shopName}</span>
                <span>{telephone}</span>
              </p>
              <p className="address">{address}</p>
            </div>
            <div className="line" />
          </div>
          <div className="orderConfirm_inner">
            <DatePicker
              mode="date"
              title="选择到货日期"
              value={this.state.date}
              onChange={date => this.setState({ date })}
            >
              <OrderDate />
            </DatePicker>
            <div className="flex_lr_sb_c">
              <span>备注</span>
              <input placeholder="输入备注自信" />
            </div>
            <Link to="/home/shopCard/orderConfirm/shopList">
              <div className="flex_lr_sb_c">
                <span>商品清单</span>
                <div className="flex_lr_sb_c">
                  <span className="item">共{this.countOrder}张订单</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <ComfirmButton money={this.money} />
        <Route
          path="/home/shopCard/orderConfirm/recevieAddress"
          component={ReceiveAddress}
        />
        <Route
          path="/home/shopCard/orderConfirm/shopList"
          component={ShopList}
        />
      </div>
    );
  }
}

OrderConfirm.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
  infoStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default OrderConfirm;
