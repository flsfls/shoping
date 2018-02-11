import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import './style.less';

@withRouter
class ARButton extends React.Component {
  componentDidMount() {
    // will did
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.location.pathname === '/home' && nextProps.count !== this.props.count) {
      return true;
    }
    return true;
  }
  render() {
    const {
      addFunc,
      reduceFunc,
      count,
    } = this.props;
    return (
      <div className="flex_lr_c_c arbutton">
        {
          count > 0 ?
            [
              <CustomIcon type="reduce" key="reduce" onClick={reduceFunc} />,
              <span key="count" >{count}</span>,
            ]
            :
            null
        }
        <CustomIcon
          type="add"
          onClick={addFunc}
        />
      </div>
    );
  }
}

/**
 * // 传入的props参数
 * @param {number} count 物料的数量
 * @param {func} addFunc 添加物料的操作，执行的函数
 * @param {func} reduceFunc 减去物料操作，执行的函数
 */
ARButton.propTypes = {
  count: PropTypes.number.isRequired,
  addFunc: PropTypes.func.isRequired,
  reduceFunc: PropTypes.func.isRequired,
  location: PropTypes.object,
};

ARButton.defaultProps = {
  location: {},
};

export default ARButton;
