import React from 'react';
import { Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import OrderList from './orderList';
import { get } from '@util/http'; // eslint-disable-line

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class OrderGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 6,
      pageNum: 1,
      showTip: false,
      endTip: false,
      hasMore: true,
    };
  }
  componentWillMount() {
    if (localStorage.goodListStore) {
      const goodListStore = JSON.parse(localStorage.goodListStore);
      this.props.goodStore.saveCacheStore(goodListStore);
    }
  }

  componentDidMount() {
    Toast.loading('加载数据中', 0, () => { }, false);
    this.getShopList();
  }

  getShopList = () => {
    const {
      pageSize,
      pageNum,
      hasMore,
    } = this.state;
    const { goodStore } = this.props;
    if (!hasMore) return;
    this.setState({
      hasMore: false,
    });
    get('api/shop/getshop', { pageSize, pageNum }).then(({ data }) => {
      Toast.hide();
      const isHasMore = data.length >= pageSize;
      goodStore.addGoodList(data);
      this.setState({
        pageNum: pageNum + (isHasMore ? 1 : 0),
        hasMore: isHasMore,
        showTip: isHasMore ? true : false, // eslint-disable-line
        endTip: isHasMore ? false : true, // eslint-disable-line
      });
    });
  }

  render() {
    const { showTip, endTip } = this.state;
    const { goodStore } = this.props;
    const goodList = goodStore.goodList.toJS();
    return (
      <InfiniteScroll
        height="11.46rem"
        next={this.getShopList}
        hasMore={this.state.hasMore}
        loader={
          showTip ?
            <p className="noMore">
              <b>加载更多物料中...</b>
            </p> : null
        }
        endMessage={
          endTip ?
            <p className="noMore">
              <b>没有更多数据了</b>
            </p>
            : null
        }
      >
        <div className="flex_lr_sb_n orderGoods">
          {goodList.map((item, index) => (
            <OrderList
              index={index}
              item={item}
              key={item.name}
            />
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}

OrderGoods.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

export default OrderGoods;
