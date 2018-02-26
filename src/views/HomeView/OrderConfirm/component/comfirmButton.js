import React from 'react';
import PropTypes from 'prop-types';

class TotalButton extends React.Component {
  componentDidMount() {
    // will did
  }
  render() {
    return (
      <div className="fix_button flex_lr_sb_c confirm_button">
        <div className="flex_lr_fs_c">
          <span className="title">合计:</span>
          <span className="money">¥{this.props.money}</span>
        </div>
        <p className="confirm">提交下单</p>
      </div>
    );
  }
}

TotalButton.propTypes = {
  money: PropTypes.number.isRequired,
};

export default TotalButton;
