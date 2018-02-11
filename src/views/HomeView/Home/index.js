import React from 'react';
import { TabBar } from 'antd-mobile';
import { Route, Link } from 'react-router-dom';
import CustomIcon from '@components/CustomIcon'; // eslint-disable-line
import SlideBar from './component/slideBar';
import ShopCard from '../ShopCard';
import Header from './component/header';
import OrderGoods from './component/orderGoods';
import Classification from '../classification';
import './assets/style.less';
import './assets/index.less';
// import { inject, observer } from 'mobx-react';
// import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'goodOrder',
      open: false,
      hidden: false,
    };
  }

  componentWillMount() {
    // will
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  renderContent = (pageText) => {
    console.log(2);
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <p><Link to="/home/shopCard">{pageText}</Link></p>
      </div>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <div className="inner_body home">
        <Header onOpenChange={this.onOpenChange} />
        <div
          ref={(node) => { this.scrollnode = node; }}
          className="scroll_body home_container"
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#F04841"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="订货"
              key="goodOrder"
              icon={<CustomIcon type="goodOrderNo" />
              }
              selectedIcon={<CustomIcon type="goodOrder" />
              }
              selected={this.state.selectedTab === 'goodOrder'}
              onPress={() => {
                this.setState({
                  selectedTab: 'goodOrder',
                });
              }}
              data-seed="logId"
            >
              <OrderGoods />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <CustomIcon type="receiveOrderNo" />
              }
              selectedIcon={
                <CustomIcon type="receiveOrder" />
              }
              title="收货"
              key="receiveOrder"
              selected={this.state.selectedTab === 'receiveOrder'}
              onPress={() => {
                this.setState({
                  selectedTab: 'receiveOrder',
                });
              }}
              data-seed="logId1"
            >
              {this.renderContent('Koubei')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <CustomIcon type="libraryNo" />
              }
              selectedIcon={
                <CustomIcon type="library" />
              }
              title="出库"
              key="library"
              selected={this.state.selectedTab === 'library'}
              onPress={() => {
                this.setState({
                  selectedTab: 'library',
                });
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={<CustomIcon type="inventoryNo" />}
              selectedIcon={<CustomIcon type="inventory" />}
              title="盘点"
              key="inventory"
              selected={this.state.selectedTab === 'inventory'}
              onPress={() => {
                this.setState({
                  selectedTab: 'inventory',
                });
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
            <TabBar.Item
              icon={<CustomIcon type="myNo" />}
              selectedIcon={<CustomIcon type="my" />}
              title="我的"
              key="my"
              selected={this.state.selectedTab === 'my'}
              onPress={() => {
                this.setState({
                  selectedTab: 'my',
                });
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>
        <SlideBar
          open={open}
          onOpenChange={this.onOpenChange}
        />
        <Route path="/home/shopCard" component={ShopCard} />
        <Route path="/home/classification" component={Classification} />
      </div>
    );
  }
}


export default Home;
