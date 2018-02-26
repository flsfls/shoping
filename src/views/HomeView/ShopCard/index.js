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
    // 防止用户刷新页面，如果有sessionStorage.groupStore的话，先用sessionStorage.groupStore保存的数据
    // 否则把选取的物料进行group组合化，进行保存到mobx的groupStore中
    this.props.goodStore.addGroupStore();
  }

  componentWillUnmount() {
    // 当页面销毁返回到主页面的时候，把下拉加载的物料和选取中的物料再进行一个数量比对
    this.props.goodStore.comparsionGoodList();
    // 把sessionStorage中的groupStore删除，进来后进行groupStore根据先中的物料进行重置
    sessionStorage.removeItem('groupStore');
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
            groupStore.map((item, outIndex) => (
              <CardList
                shopItem={item}
                outIndex={outIndex}
                key={item.get('shopId')}
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

/**
  * @param {mobx} goodStore mobx中的所有物料操作
  */
ShopCard.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

export default ShopCard;

