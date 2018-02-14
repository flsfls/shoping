import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchHeader from './component/searchHeader';
import { get } from '@util/http';  // eslint-disable-line
import SearchList from './component/searchList';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import './assets/style.less';


@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class Search extends React.Component {
  state = {
    value: '',
    pageSize: 10,
    pageNum: 1,
    showTip: false,
    endTip: false,
    hasMore: true,
  }

  componentDidMount() {
    this.time = this.throttle(() => this.getFetchList('init'), 300);
    this.props.goodStore.cleanSearchStore();
  }

  onChange = (value) => {
    this.setState({
      value,
      pageNum: 1,
      hasMore: true,
    }, () => {
      this.time();
    });
  }

  getFetchList = (flag) => {
    const {
      pageSize,
      pageNum,
      value,
      hasMore,
    } = this.state;
    if (!hasMore) return;
    this.setState({
      hasMore: false,
    });
    get('api/shop/searchShop', { keyWord: value, pageSize, pageNum }).then(({ data }) => {
      if (flag === 'init') {
        this.props.goodStore.cleanSearchStore();
      }
      const isHasMore = data.length >= pageSize;
      this.setState({
        pageNum: pageNum + (isHasMore ? 1 : 0),
        hasMore: isHasMore,
        showTip: isHasMore ? true : false, // eslint-disable-line
        endTip: isHasMore ? false : true, // eslint-disable-line
      });
      this.props.goodStore.addSearchStore(data);
    });
  }

  getSearchList = () => {
    this.getFetchList();
  }

  throttle = (func, wait) => {
    let time;
    function timer() {
      clearTimeout(time);
      time = setTimeout(() => {
        func();
      }, wait);
    }
    return timer;
  }

  render() {
    const {
      value,
      showTip,
      hasMore,
      endTip,
    } = this.state;
    const { searchStore } = this.props.goodStore;
    return (
      <div className="inner_body my_search">
        <SearchHeader
          value={value}
          onChange={this.onChange}
        />
        <div className="scroll_body search_content" ref={(node) => { this.container = node; }}>
          <InfiniteScroll
            height="12.44rem"
            next={this.getSearchList}
            hasMore={hasMore}
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
            {
              searchStore.size === 0
                ?
                null
                :
                searchStore.map((material, index) => (
                  <SearchList
                    material={material}
                    key={material.get('_id')}
                    index={index}
                  />
                ))
            }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

Search.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

export default Search;
