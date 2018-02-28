import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
class TotalButton extends React.Component {
  componentDidMount() {
    // will did
  }
  commitOrder = () => {
    this.props.commitOrder().then(() => {
      this.props.history.push('/home/shopCard/orderConfirm/commitOrder', {
        money: this.props.money,
      });
    });
  }
  render() {
    return (
      <div className="fix_button flex_lr_sb_c confirm_button">
        <div className="flex_lr_fs_c">
          <span className="title">合计:</span>
          <span className="money">¥{this.props.money}</span>
        </div>
        <p className="confirm" onClick={this.commitOrder}>提交下单</p>
      </div>
    );
  }
}

TotalButton.propTypes = {
  history: PropTypes.object,
  money: PropTypes.number.isRequired,
  commitOrder: PropTypes.func.isRequired,
};

TotalButton.defaultProps = {
  history: {},
};
export default TotalButton;
