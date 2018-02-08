import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import './style.less';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class ARButton extends React.Component {
  componentDidMount() {
    // will did
  }


  render() {
    const {
      count,
      index,
      item,
      goodStore,
    } = this.props;
    return (
      <div className="flex_lr_c_c arbutton">
        {
          count > 0 ?
            [
              <CustomIcon type="reduce" key="reduce" onClick={() => goodStore.changeGoodCount(item, -1, index)} />,
              <span key="count" >{count}</span>,
            ]
            :
            null
        }
        <CustomIcon
          type="add"
          onClick={() => goodStore.changeGoodCount(item, 1, index)}
        />
      </div>
    );
  }
}

ARButton.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};


ARButton.propTypes = {
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object,
};

ARButton.defaultProps = {
  item: {},
};

export default ARButton;
