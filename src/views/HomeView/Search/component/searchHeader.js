import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomIcon from '@components/CustomIcon'  // eslint-disable-line

@withRouter @inject(store => ({
  goodStore: store.goodStore,
})) @observer
class SearchHeader extends React.Component {
  componentDidMount() {
    this.autoFocusInst.focus();
  }

  gofanhui = () => {
    this.props.goodStore.cleanSearchStore();
    this.props.history.goBack();
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <div className="search_top flex_lr_sb_c">
        <div className="search_box">
          <div className="flex_lr_fs_c">
            <CustomIcon size="xxs" type="searchs" />
            <input
              placeholder="搜索商品"
              ref={(node) => { this.autoFocusInst = node; }}
              value={value}
              onChange={e => onChange(e.target.value)}
              type="search"
            />
          </div>
        </div>
        <div className="cancel" onClick={this.gofanhui}>
          取消
        </div>
      </div>
    );
  }
}

SearchHeader.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};
SearchHeader.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  history: PropTypes.object,
};

SearchHeader.defaultProps = {
  history: {},
};

export default SearchHeader;
