import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import Bscroll from 'better-scroll';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import ClassfiItem from './component/classfiItem';
import Search from '@homeView/Search'; // eslint-disable-line
import { get } from '@util/http' // eslint-disable-line
import './assets/style.less';

@inject(store => ({
  goodStore: store.goodStore,
  // classfiStore: store.goodStore.classfiStore,
})) @observer
class Classification extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  state = {
    currentIndex: 0,
    animating: true,
  }

  componentDidMount() {
    const { shopId } = sessionStorage;
    get('api/shop/getClassfiShop', { shopId }).then(({ data }) => {
      this.setState({
        animating: false,
      });
      this.props.goodStore.addClassfiStore(data);
      this.calculateHeight();
      this.initScroll();
    });
  }

  componentWillUnmount() {
    this.foodScroll.destroy();
    this.props.goodStore.cleanClassfiStore();
    this.props.goodStore.comparsionGoodList();
  }

  selectMenu = (index) => {
    const foodList = this.food.getElementsByClassName('food-list-hook');
    const height = foodList[index];
    this.foodScroll.scrollToElement(height, 300);
  }

  initScroll = () => {
    this.meunScroll = new Bscroll(this.menu, {
      click: true,
      probeType: 3,
    });

    this.foodScroll = new Bscroll(this.food, {
      click: true,
      probeType: 3,
    });
    this.foodScroll.on('scroll', (pos) => {
      this.scrollY = Math.abs(Math.round(pos.y));
      for (let i = 0; i < this.listHeight.length; i += 1) {
        const height1 = this.listHeight[i];
        const height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          const munelist = this.menu.getElementsByClassName('meun-list-hook');
          if (i > 3) {
            this.meunScroll.scrollToElement(munelist[i - 2], 300);
          } else {
            this.meunScroll.scrollToElement(munelist[0], 300);
          }
          this.setState({
            currentIndex: i,
          });
          return;
        }
      }
      this.setState({
        currentIndex: 0,
      });
    });
  }

  calculateHeight = () => {
    this.listHeight = [];
    const foodList = this.food.getElementsByClassName('food-list-hook');
    let height = 0;
    this.listHeight.push(height);
    for (let i = 0; i < foodList.length; i += 1) {
      const item = foodList[i];
      height += item.clientHeight;
      this.listHeight.push(height);
    }
  }

  render() {
    const { classfiStore } = this.props.goodStore;
    const meunList = classfiStore.toJS().map(i => ({
      classifId: i.classifId,
      classifName: i.classifName,
    }));
    const { currentIndex } = this.state;
    return (
      <div className="inner_body classification ">
        <ActivityIndicator
          toast
          text="Loading..."
          animating={this.state.animating}
        />
        <HomeNavBar
          title="商品分类"
          path="/home"
        />
        <div className="menu_wrap" ref={(menu) => { this.menu = menu; }}>
          <ul>
            {
              meunList.map((item, index) => (
                <li
                  key={item.classifId}
                  className="meun-list-hook"
                  onClick={() => this.selectMenu(index)}
                  style={{
                    background: index === currentIndex ? '#fff' : '#FAFAFA',
                    borderLeft: index === currentIndex ? '3px solid #FF6050' : '0 solid #FF6050',
                    borderRight: index === currentIndex ? '1px solid #fff' : '0 solid #FF6050',
                  }}
                >
                  <span>{item.classifName}</span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="foods_wrap" ref={(food) => { this.food = food; }}>
          <ul>
            {
              classfiStore.map((item, outIndex) => (
                <li className="warp_li food-list-hook" key={item.get('classifId')} >
                  <p className="classfi_name">{item.classifName}</p>
                  <ul className="classfi_item_box">
                    {item.get('material').map((material, innerIndex) => (
                      <div key={material.get('_id')}>
                        <ClassfiItem
                          material={material}
                          outIndex={outIndex}
                          innerIndex={innerIndex}
                        />
                      </div>
                    ))}
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
        <Route path="/home/classification/search" component={Search} />
      </div>
    );
  }
}


Classification.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};
// Classification.propTypes = {
//   location: PropTypes.object,
// };

// Classification.defaultProps = {
//   location: {},
// };

export default Classification;
