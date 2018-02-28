import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import { getTotalMoney } from '@util/homeViewModule'; // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class ShopList extends React.Component {
  componentDidMount() {
    // will did
  }
  render() {
    const { groupStore } = this.props.goodStore;
    let copyGoodStore = groupStore;
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
            copyGoodStore.toJS().map(({ shopName, material, shopId }) => (
              <div className="list_item" key={shopId} >
                <div className="flex_lr_sb_c item_header">
                  <div className="flex_lr_fs_c">
                    <CustomIcon type="shop" size="xxs" />
                    <span>{shopName}</span>
                  </div>
                  <p>共{material.length}件</p>
                </div>
                {
                  material.map(({
                    img,
                    name,
                    count,
                    _id,
                  }) => (
                    <div className="flex_lr_sb_fs item_body" key={_id} >
                      <div className="flex_lr_sb_fs item_inner">
                        <img src={img} alt="" />
                        <span className="body_content">{name}</span>
                      </div>
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
