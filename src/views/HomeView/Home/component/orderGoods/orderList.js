import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import ARButton from '@homeView/components/ARButton'; // eslint-disable-line

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class OrderList extends React.Component {
  componentDidMount() {
    // will do
  }
  /**
   * @param {obj} item 每个物料的所有数据
   * @param {number} flag 标识是点减少还是增加
   * @marjor function 点击加减按扭执行mobx changeGoodCount的action 改变下拉列表的数量，进行同步更新
   * 和调用changeGoodListStore 改变存储选中的下拉数据
   */
  changeGoodCount = (item, flag) => {
    this.props.goodStore.changeGoodCount(item, flag);
    this.props.goodStore.changeGoodListStore(item, flag);
  }

  render() {
    const { item } = this.props;
    /**
     * @param {string} img 物料图片
     * @param {string} name 物料名
     * @param {string} until 物料规格
     * @param {number} money 物料价格
     * @param {number} count 物料数量
     */
    const {
      img,
      name,
      until,
      money,
      count,
    } = item;
    return (
      <div className="order_item">
        <img className="item_img" src={img} alt="" />
        <div className="flex_tb_sb_n item_info">
          <p className="info_goodName">{name}</p>
          <div className="flex_lr_sb_c">
            <p className="price_kg"><span>¥{money}块</span>／{until}</p>
            <ARButton
              count={count}
              addFunc={() => this.changeGoodCount(item, 1)}
              reduceFunc={() => this.changeGoodCount(item, -1)}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @param {obj} item 每个物料的所有数据
 */
OrderList.propTypes = {
  item: PropTypes.object.isRequired,
};

OrderList.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

export default OrderList;
