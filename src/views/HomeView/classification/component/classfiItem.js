import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import LazyLoad from 'vanilla-lazyload';
import lazyImg from '../assets/bg.jpg';
import ARButton from '../../components/ARButton';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class classfiItem extends React.Component {
  componentDidMount() {
    new LazyLoad(); // eslint-disable-line
  }
  /**
   * @param material 当前点击选中的物料
   * @param flag 加操作还是减操作（-1或者1）
   * @constant outIndex 物料分类组的外层下标
   * @constant innerIndex 物料组的每个物料的内层下标
   * @method changeClassfiCount 改变ClassfiCount里的数量
   * @method changeClassfiCount 同时改变选中的存储数量
   */
  changeCount = (material, flag) => {
    const { outIndex, innerIndex } = this.props;
    this.props.goodStore.changeClassfiCount(outIndex, innerIndex, flag);
    this.props.goodStore.changeGoodListStore(material, flag);
  }

  render() {
    const { material } = this.props;
    const {
      img, // 图片
      name, // 物料名
      until, // 物料规格
      money, // 物料钱
      count, // 物料数量
    } = material.toJS();
    return (
      <div className="classif_item">
        <div className="flex_lr_fs_c">
          <img data-src={img} src={lazyImg} alt="" />
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

classfiItem.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

classfiItem.propTypes = {
  material: PropTypes.object.isRequired,
  outIndex: PropTypes.number.isRequired,
  innerIndex: PropTypes.number.isRequired,
};

export default classfiItem;
