
import React from 'react';
import { Button, Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { validationAddress } from '@util/homeViewModule'; // eslint-disable-line
import AddressEdit from '../components/AddressEdit';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  infoStore: store.infoStore,
})) @observer
class EditAddress extends React.Component {
  state = {
    shopName: '',
    telephone: '',
    address: '',
  }
  componentWillMount() {
    const {
      shopName,
      telephone,
      address,
    } = this.props.location.state.item;
    this.setState({
      shopName,
      telephone,
      address,
    });
  }

  onChange = (value, flag) => {
    this.setState({
      [flag]: value,
    });
  }

  editAddress = (flag) => {
    const { _id } = this.props.location.state.item;
    if (flag === 'edit') {
      const validateFlag = validationAddress(this.state);
      if (!validateFlag) return;
      Toast.info('修改成功', 1);
      this.props.infoStore.editAddress(_id, this.state);
    } else {
      Toast.info('删除成功', 1);
      this.props.infoStore.deleteAddress(_id);
    }
    this.props.history.goBack();
  }
  render() {
    const {
      shopName,
      telephone,
      address,
    } = this.state;
    return (
      <div className="inner_body edit_address">
        <HomeNavBar
          title="编辑收货地址"
          path="/home/shopCard/orderConfirm/recevieAddress"
        />
        <AddressEdit
          shopName={shopName}
          telephone={telephone}
          address={address}
          onChange={this.onChange}
        />
        <Button
          onClick={() => this.editAddress('edit')}
          className="click_button confirm"
        >
          确定
        </Button>
        <Button
          className="click_button delete"
          onClick={() => this.editAddress()}
        >
          删除
        </Button>
      </div>
    );
  }
}

EditAddress.wrappedComponent.propTypes = {
  infoStore: PropTypes.object.isRequired,
};

EditAddress.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default EditAddress;
