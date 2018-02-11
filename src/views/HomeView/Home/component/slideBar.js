import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Drawer } from 'antd-mobile';
import CustomIcon from '@components/CustomIcon'  // eslint-disable-line

@withRouter
class SlideBar extends React.Component {
  componentDidMount() {
    // will do
  }

  goClassification = (shopId) => {
    this.props.history.push('/home/classification', {
      shopId,
    });
  }

  render() {
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
    const { open, onOpenChange } = this.props;
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
        onOpenChange={onOpenChange}
      >
       1
      </Drawer>
    );
  }
}

SlideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  history: PropTypes.object,
};
SlideBar.defaultProps = {
  history: { },
};

export default SlideBar;
