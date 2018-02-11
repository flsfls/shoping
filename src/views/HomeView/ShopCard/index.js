import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import CardList from './component/cardList';
import TotalButton from './component/totalBottom';
import OrderConfirm from '../OrderConfirm';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class ShopCard extends Component {
  componentWillMount() {
    const { goodListStore } = this.props.goodStore;
    const groupGood = goodListStore.toJS().reduce((box, next) => {
      const item = next;
      item.check = true;
      const { shopName, shopId } = item;
      const obj = {
        shopName,
        shopId,
        check: true,
        material: [item],
      };
      if (box.length === 0) {
        box.push(obj);
      } else {
        for (let i = 0; i < box.length; i += 1) {
          if (box[i].shopId === item.shopId) {
            const materialItem = box[i].material;
            materialItem.push(item);
            return box;
          }
        }
        box.push(obj);
        return box;
      }
      return box;
    }, []);
    this.props.goodStore.addGroupStore(groupGood);
  }

  componentWillUnmount() {
    this.props.goodStore.comparsionGoodList();
  }

  render() {
    const { groupStore } = this.props.goodStore;
    return (
      <div className="inner_body shopcard">
        <HomeNavBar
          title="购物车"
          path="/home"
        />
        <div className="scroll_body">
          {
            groupStore.toJS().map((item, outIndex) => (
              <CardList
                shopItem={item}
                outIndex={outIndex}
                key={item.shopId}
              />
            ))
          }
        </div>
        <TotalButton />
        <Route
          path="/home/shopCard/orderConfirm"
          component={OrderConfirm}
        />
      </div>
    );
  }
}

ShopCard.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

export default ShopCard;

