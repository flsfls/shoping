import React from 'react';
import PropTypes from 'prop-types';
import orderGood from '../../assets/ordergood.jpg';
import ARButton from '@homeView/components/ARButton'; // eslint-disable-line


class OrderList extends React.Component {
  componentDidMount() {
    // will do
  }

  render() {
    const { item, index } = this.props;
    const {
      img,
      name,
      until,
      money,
      count,
    } = item;
    return (
      <div className="order_item">
        <img className="item_img" src={orderGood} alt="" />
        <div className="flex_tb_sb_n item_info">
          <p className="info_goodName">{name}</p>
          <div className="flex_lr_sb_c">
            <p className="price_kg"><span>¥{money}块</span>／{until}</p>
            <ARButton
              item={item}
              index={index}
              count={count}
            />
          </div>
        </div>
      </div>
    );
  }
}

OrderList.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderList;
