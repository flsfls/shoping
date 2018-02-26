import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Drawer } from 'antd-mobile';
import CustomIcon from '@components/CustomIcon'  // eslint-disable-line

@withRouter
class SlideBar extends React.Component {
  /**
   * @param {String}  shopId 供应商门主店的id
   * @method onOpenChange 父组件传入改变slidebar的toggle
   * @description 当点击slidebar里供应商的分类门店时，跳到分类页面，把当前店铺id保存到session中，再调用onOpenChange关闭slidebar
   */
  goClassification = (shopId) => {
    this.props.onOpenChange();
    sessionStorage.shopId = shopId;
    this.props.history.push('/home/classification');
  }

  render() {
    // 这里的shop是假数据
    const shop = [
      { shopName: '小肥羊总部', shopId: '1' },
      { shopName: '沙县大酒店总部', shopId: '2' },
      { shopName: '新疆拉面总部', shopId: '3' },
      { shopName: '光明顶总部', shopId: '4' },
    ];
    const slidebar = shop.map(item => (
      <div
        key={item.shopId}
        onClick={() => this.goClassification(item.shopId)}
        className="flex_lr_fs_fs slide_bar"
      >
        <CustomIcon type="shop" size="xs" />
        <span>{item.shopName}</span>
      </div>
    ));
    const { open } = this.props;
    return (
      <Drawer
        className="my-drawer"
        transitions={false}
        style={{
          minHeight: document.documentElement.clientHeight,
          zIndex: open ? '100' : 0,
          display: open ? 'inherit' : 'none',
        }}
        overlayStyle={{
          background: 'rgba(255, 255, 255, 0)',
        }}
        sidebar={slidebar}
        enableDragHandle
        contentStyle={{ color: '#fff', textAlign: 'center', paddingTop: 42 }}
        open={open}
      >
        1
      </Drawer>
    );
  }
}

/**
 * @param {boolean}  open 初始化是否打开slidebar
 * @param {object}  history 非路由组件，中的路由信息
 * @method onOpenChange 父组件传入改变slidebar的toggle
 */
SlideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  history: PropTypes.object,
  onOpenChange: PropTypes.func.isRequired,
};
SlideBar.defaultProps = {
  history: {},
};

export default SlideBar;
