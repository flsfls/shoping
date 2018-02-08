import React from 'react';
import { Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter @inject(store => ({
  goodStore: store.goodStore,
})) @observer
class TotalButton extends React.Component {
  componentDidMount() {
    // will do
  }

  confirmHandler = () => {
    const { totalMoney } = this.props.goodStore;
    if (totalMoney === 0) {
      Toast.info('请选择物料商品', 1);
    } else {
      this.props.history.push('/home/shopCard/orderConfirm');
    }
  }

  render() {
    const { totalMoney } = this.props.goodStore;
    return (
      <div className="fix_button flex_lr_sb_c total_button">
        <div className="flex_lr_fs_c">
          <span className="title">合计:</span>
          <span className="money">¥{totalMoney}</span>
        </div>
        <p
          style={{ background: totalMoney === 0 ? '#a5a5a5' : '#FF6050' }}
          className="confirm"
          onClick={this.confirmHandler}
        >
          下单
        </p>
      </div>
    );
  }
}

TotalButton.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};
TotalButton.propTypes = {
  history: PropTypes.object,
};
TotalButton.defaultProps = {
  history: {},
};

export default TotalButton;
