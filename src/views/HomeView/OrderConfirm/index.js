import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd-mobile';
import { Link, Route } from 'react-router-dom';
import ComfirmButton from './component/comfirmButton';
import ReceiveAddress from '../ReceiveAddress';
import ShopList from '../ShopList';
import CommitOrder from '../commitOrder';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  infoStore: store.infoStore,
})) @observer


class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    /**
     * @constant nowTimeStamp 当前时间加一天
     * @constant now 转成日期格式
     */
    const nowTimeStamp = Date.now() + (1000 * 60 * 60 * 24);
    const now = new Date(nowTimeStamp);
    this.state = {
      date: now,
    };
  }

  componentWillMount() {
    const { groupStore } = sessionStorage;
    /**
     * @constant countOrder 订单数量的初始值
     * @description 通过格式化之后，只要内层有任何一个物料打勾，就算一个清单，先通过外层判断
     * 如果外层是true,说明全勾选，则是一个清单，如果外层没有打勾，则内层只有有一个物料打勾也是一个清单
     */
    let countOrder = 0;
    let money = 0;
    let flag = false;
    JSON.parse(groupStore).forEach((good) => {
      const isCountOrder = (() => {
        good.material.forEach((materialItem) => {
          if (materialItem.check) {
            flag = true;
            money += materialItem.count * materialItem.money;
          }
        });
        return flag;
      })();
      if (isCountOrder) {
        flag = false;
        countOrder += 1;
      }
    });
    this.countOrder = countOrder;
    this.money = money;
  }

  /**
   * @param id 地址id
   * @description 把地址id存在sessionStorage中，带到收货地址展示页，再通过路由跳转到收货地址展示页
   */
  goReceiveAddress = (id) => {
    sessionStorage.id = id;
    this.props.history.push('/home/shopCard/orderConfirm/recevieAddress');
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
    /**
     * @constant _id 地址id
     * @constant address 具体地址
     * @constant shopName 总部名字
     * @constant shopName 总部电话
     * @description 这个是要通过用户请求来的，我在mobx中写死
     */
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
        <ComfirmButton
          money={this.money}
        />
        <Route
          path="/home/shopCard/orderConfirm/recevieAddress"
          component={ReceiveAddress}
        />
        <Route
          path="/home/shopCard/orderConfirm/shopList"
          component={ShopList}
        />
        <Route
          path="/home/shopCard/orderConfirm/commitOrder"
          component={CommitOrder}
        />
      </div>
    );
  }
}

/**
  * @param {mobx} infoStore mobx中的地址存储与操作
  */
OrderConfirm.wrappedComponent.propTypes = {
  infoStore: PropTypes.object.isRequired,
};

/**
  * @param {router} history 路由信息
  */
OrderConfirm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default OrderConfirm;
