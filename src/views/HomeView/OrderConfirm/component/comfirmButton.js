import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class TotalButton extends React.Component {
  componentDidMount() {
    // will do
  }

  render() {
    const { totalMoney } = this.props.goodStore;
    return (
      <div className="fix_button flex_lr_sb_c confirm_button">
        <div className="flex_lr_fs_c">
          <span className="title">合计:</span>
          <span className="money">¥{totalMoney}</span>
        </div>
        <p className="confirm">提交下单</p>
      </div>
    );
  }
}

TotalButton.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

export default TotalButton;
