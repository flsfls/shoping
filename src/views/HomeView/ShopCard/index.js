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
  componentDidMount() {
    // willdid
  }

  render() {
    const { goodStore } = this.props.goodStore;
    console.log(goodStore.toJS());
    return (
      <div className="inner_body shopcard">
        <HomeNavBar
          title="购物车"
          path="/home"
        />
        <div className="scroll_body">
          {
            goodStore.toJS().map(item => <CardList item={item} key={item.supId} />)
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

