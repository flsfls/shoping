import React from 'react';
import PropTypes from 'prop-types';
import { List, InputItem, TextareaItem } from 'antd-mobile';
import './style.less';

class AddressEdit extends React.Component {
  componentDidMount() {
    // will do
  }
  render() {
    const {
      shopName,
      telephone,
      address,
      onChange,
    } = this.props;
    return (
      <div className="add_info">
        <List>
          <InputItem
            value={shopName}
            clear
            placeholder="请输入收货人姓名"
            onChange={value => onChange(value, 'shopName')}
          >收货人
          </InputItem>
          <InputItem
            onChange={value => onChange(value, 'telephone')}
            value={telephone}
            clear
            placeholder="请输入收货人手机号码"
          >手机号码
          </InputItem>
          <TextareaItem
            onChange={value => onChange(value, 'address')}
            value={address}
            title="收货地址"
            placeholder="请输入收货地址"
            data-seed="logId"
            rows={2}
          />
        </List>
      </div>
    );
  }
}

AddressEdit.propTypes = {
  shopName: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddressEdit;

