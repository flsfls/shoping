import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button, Toast } from 'antd-mobile';
import HomeNavBar from '@components/NavBar';  // eslint-disable-line
import './asset/style.less';
import Ok from './asset/commit.jpg';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class CommitOrder extends React.Component {
  componentWillMount() {
    // will did
    this.money = this.props.location.state.money;
  }

  completeOrder = () => {
    this.props.goodStore.cleanGoodListStore();
    localStorage.removeItem('goodListStore');
    Toast.info('订单提交成功', 1);
    this.props.history.go(-3);
  }

  render() {
    return (
      <div className="commitOrder inner_body">
        <HomeNavBar
          title="订单页"
        />
        <div className="scroll_body commitContainer">
          <img className="commit_img" src={Ok} alt="ok" />
          <p className="commit_text">确定提交成功</p>
          <div className="content">
            <div className="flex_lr_sb_fs">
              <p className="left">网上单号</p>
              <p className="right">20171002002424</p>
            </div>
            <span className="commit_line" />
            <div className="flex_lr_sb_fs order_money">
              <p className="left">订单金额</p>
              <p className="right_money">¥{this.money}</p>
            </div>
            <Button onClick={this.completeOrder}>完成</Button>
          </div>
        </div>
      </div>
    );
  }
}


/**
  * @param {mobx} goodStore mobx中的所有物料操作
  */
CommitOrder.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};


CommitOrder.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default CommitOrder;
