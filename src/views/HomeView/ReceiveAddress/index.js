import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd-mobile';
import { Link, Route } from 'react-router-dom';
import AddRcAddress from '../AddRcAddress';
import EditAddress from '../EditAddress';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import { get } from '@util/http' // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  infoStore: store.infoStore,
})) @observer
class ReceiveAddress extends React.Component {
  componentWillMount() {
    console.log('fff');
    get('api/shop/getAddress').then(({ data }) => {
      const { id } = sessionStorage;
      const NewData = data.map((item) => {
        const newItem = item;
        if (item._id === id) {  // eslint-disable-line
          newItem.check = true;
        } else {
          newItem.check = false;
        }
        return newItem;
      });
      this.props.infoStore.addAddress(NewData);
    });
  }

  componentDidMount() {
    // will did
  }

  componentWillUnmount() {
    this.props.infoStore.cleanAddress();
  }

  goEditAddress = (item) => {
    this.props.history.push('/home/shopCard/orderConfirm/recevieAddress/editAddress', {
      item,
    });
  }

  changeAddress = (item) => {
    this.props.infoStore.changeInitAddress(item);
    this.props.history.go(-1);
  }

  render() {
    const { addressList } = this.props.infoStore;
    console.log(addressList.toJS());
    return (
      <div className="inner_body receive_address">
        <HomeNavBar title="收货地址" path="/home/shopCard/orderConfirm" />
        <div className="scroll_body receive_list">
          {addressList.toJS().map((item) => {
            const {
              address,
              telephone,
              shopName,
              _id,
              check,
            } = item;
            return (
              <div className="flex_lr_sb_c list_item" key={_id}>
                <Checkbox
                  checked={check}
                  onChange={() => this.changeAddress(item)}
                />
                <div className="item_info" onClick={() => this.changeAddress(item)}>
                  <p>
                    <span>{shopName}</span>
                    <span>{telephone}</span>
                  </p>
                  <p className="info_address">{address}</p>
                </div>
                <CustomIcon type="edit" onClick={() => this.goEditAddress(item)} />
              </div>
            );
          })}
        </div>
        <Link to="/home/shopCard/orderConfirm/recevieAddress/addRcAddress">
          <div className="fix_button flex_lr_c_c add_receive">
            <CustomIcon type="addButton" className="add" size="xxs" />
            <span>新增收货地址</span>
          </div>
        </Link>
        <Route
          path="/home/shopCard/orderConfirm/recevieAddress/addRcAddress"
          component={AddRcAddress}
        />
        <Route
          path="/home/shopCard/orderConfirm/recevieAddress/editAddress"
          component={EditAddress}
        />
      </div>
    );
  }
}


ReceiveAddress.wrappedComponent.propTypes = {
  infoStore: PropTypes.object.isRequired,
};

ReceiveAddress.propTypes = {
  history: PropTypes.object.isRequired,
};


export default ReceiveAddress;

