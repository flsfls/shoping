import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd-mobile';
import ARButton from '@homeView/components/ARButton'; // eslint-disable-line
import pic from '../assets/pic.jpg';

@inject(store => ({
  goodStore: store.goodStore,
})) @observer
class CardList extends React.Component {
  componentDidMount() {
    // will did
  }

  changeGood = (good, flag, outIndex, innerIndex) => {
    this.props.goodStore.changeGoodListStore(good, flag);
    this.props.goodStore.changeGroupStoreCount(outIndex, innerIndex, flag);
  }

  render() {
    const { shopItem, outIndex } = this.props;
    return (
      <div className="cardList">
        <div className="list_header">
          <div className="flex_lr_fs_c list_inner">
            <Checkbox
              checked={shopItem.get('check')}
              onChange={e => this.props.goodStore.warpCheck(e, outIndex)}
            />
            <p>{shopItem.get('shopName')}</p>
          </div>
        </div>
        {
          shopItem.get('material').map((materialItem, innerIndex) => {
            // console.log(material);
            const {
              name,
              _id,
              money,
              until,
              count,
              check,
            } = materialItem.toJS();
            return (
              <div className="flex_lr_fs_c list_info" key={_id} >
                <Checkbox
                  checked={check}
                  onChange={e => this.props.goodStore.innerCheck(e, outIndex, innerIndex)}
                />
                <div className="flex_lr_fs_c info_item">
                  <img src={pic} alt="" />
                  <div className="flex_tb_sb_n infos">
                    <p>{name}</p>
                    <div className="flex_lr_sb_n">
                      <p>${money}/{until}</p>
                      <ARButton
                        count={count}
                        addFunc={() => this.changeGood(materialItem, 1, outIndex, innerIndex)}
                        reduceFunc={() => this.changeGood(materialItem, -1, outIndex, innerIndex)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

CardList.wrappedComponent.propTypes = {
  goodStore: PropTypes.object.isRequired,
};

CardList.propTypes = {
  shopItem: PropTypes.object.isRequired,
  outIndex: PropTypes.number.isRequired,
};

export default CardList;

