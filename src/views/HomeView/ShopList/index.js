import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class ShopList extends React.Component {
  componentDidMount() {
    // will did
  }
  render() {
    const { goodStore } = this.props.goodStore;
    let copyGoodStore = goodStore;
    copyGoodStore.forEach((goods, index) => {
      const newGoods = goods.get('material').filter((materialItem) => {
        if (materialItem.get('check')) {
          return true;
        }
        return false;
      });
      copyGoodStore = copyGoodStore.setIn([index, 'material'], newGoods);
    });
    return (
      <div className="inner_body shop_list">
        <HomeNavBar
          title="商品清单"
          path="/home/shopCard/orderConfirm"
        />
        <div className="scroll_body list_container">
          {
            copyGoodStore.toJS().map(({ supName, material, supId }) => (
              <div className="list_item" key={supId} >
                <div className="flex_lr_fs_c item_header">
                  <CustomIcon type="shop" size="xxs" />
                  <span>{supName}</span>
                </div>
                {
                  material.map(({ name, count, _id }) => (
                    <div className="flex_lr_sb_c item_body" key={_id} >
                      <span className="body_content">{name}</span>
                      <span className="body_count">x{count}</span>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

ShopList.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

export default ShopList;
