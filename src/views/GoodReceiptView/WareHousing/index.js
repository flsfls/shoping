import React from 'react';
import PropTypes from 'prop-types';
import { ActionSheet } from 'antd-mobile';
import { Route } from 'react-router-dom';
import AddPuchaseLibrary from '@goodReceiptView/AddPuchaseLibrary'; // eslint-disable-line
// import AddBackLibrary from '@goodReceiptView/AddBackLibrary'; // eslint-disable-line
import OrderNavBar from '@components/OrderNavBar';   // eslint-disable-line
import OrderList from '@components/OrderList'; // eslint-disable-line
import { get } from '@util/http'; // eslint-disable-line
import SlideBar from './component/slideBar';
import './assets/style.less';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class WareHousing extends React.Component {
  state = {
    open: false,
    orderList: [],
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
          info = '未审核';
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

  showActionSheet = () => {
    const BUTTONS = ['采购入库', '采购退货', '取消'];
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true,
        'data-seed': 'logId',
        wrapProps,
      },
      (buttonIndex) => {
        if (buttonIndex <= 1) {
          console.log(1);
          sessionStorage.title = BUTTONS[buttonIndex];
          this.props.history.push('/home/wareHousing/addPuchaseLibrary');
        }
      },
    );
  }

  render() {
    const { orderList, open } = this.state;
    return (
      <div className="inner_body ware_housing">
        <OrderNavBar
          placeholder="供应商 单号 单据日期"
          onOpenChange={this.onOpenChange}
          addChange={this.showActionSheet}
        />
        {orderList.map(item => (
          <OrderList
            key={item.id}
            orderItem={item}
          />
        ))}
        <SlideBar
          onOpenChange={this.onOpenChange}
          open={open}
        />
        <Route path="/home/wareHousing/addPuchaseLibrary" component={AddPuchaseLibrary} />
      </div>
    );
  }
}

WareHousing.propTypes = {
  history: PropTypes.object.isRequired,
};

export default WareHousing;
