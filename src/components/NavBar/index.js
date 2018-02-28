import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { NavBar, Modal } from 'antd-mobile';
import CustomIcon from '../CustomIcon';
import './style.less';

const { alert } = Modal;

@withRouter @inject(store => ({
  goodStore: store.goodStore,
})) @observer
class HomeNavBar extends React.Component {
  componentDidMount() {
    // will do
  }

  cleanShop = () => {
    localStorage.clear();
    this.props.goodStore.cleanGoodStore();
  }

  cleanHandler = () => {
    alert('提示', '确定是否删除购物车?', [
      { text: '取消' },
      { text: '确认', onPress: this.cleanShop },
    ]);
  }

  cleanDom = () => (
    <div className="flex_lr_sb_c right_bar" key="first" onClick={this.cleanHandler} >
      <div>
        <CustomIcon type="delete" size="xxs" />
      </div>
      <span className="right_bar_text">清除</span>
    </div>
  )

  searchDom = () => (
    <Link to="/home/classification/search" key="first">
      <span className="right_bar my_search_bar">
        搜索
      </span>
    </Link>
  )

  render() {
    const { title } = this.props;
    const { pathname } = this.props.location;
    let element;
    if (pathname === '/home/shopCard') {
      element = this.cleanDom();
    } else if (pathname === '/home/classification') {
      element = this.searchDom();
    }
    return (
      <div className="nav_bar">
        <NavBar
          mode="light"
          icon={<CustomIcon type="back" size="xs" />}
          onLeftClick={() => { this.props.history.go(-1); }}
          rightContent={[
            element,
          ]}
        >
          {title}
        </NavBar>
      </div>
    );
  }
}


HomeNavBar.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};
HomeNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
};

HomeNavBar.defaultProps = {
  location: {},
  history: {},
};

export default HomeNavBar;
