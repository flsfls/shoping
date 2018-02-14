import React from 'react';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'vanilla-lazyload';
import PropTypes from 'prop-types';
import loadingSrc from '../assets/bg.jpg';
import ARButton from '../../components/ARButton';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class searchList extends React.Component {
  componentDidMount() {
    new LazyLoad(); // eslint-disable-line
  }

  changeCount = (material, flag) => {
    const { index } = this.props;
    this.props.goodStore.changeSearchStoreCount(index, flag);
    this.props.goodStore.changeGoodListStore(material, flag);
  }

  render() {
    const { material } = this.props;
    const {
      img,
      name,
      until,
      money,
      count,
    } = material.toJS();
    return (
      <div className="classif_item flex_tb_fs_c">
        <div className="flex_lr_fs_c">
          <img data-src={img} src={loadingSrc} alt="" />
          <div className="flex_tb_sb_fs item_name">
            <span>{name}</span>
            <span className="money">¥{money}<span className="until">/{until}</span></span>
          </div>
        </div>
        <div className="flex_lr_sb_c">
          <span className="money">¥{money}<span className="until">/{until}</span></span>
          <ARButton
            count={count}
            addFunc={() => this.changeCount(material, 1)}
            reduceFunc={() => this.changeCount(material, -1)}
          />
        </div>
      </div>
    );
  }
}

searchList.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

searchList.propTypes = {
  material: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
export default searchList;
