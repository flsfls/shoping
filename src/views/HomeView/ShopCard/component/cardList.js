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

  render() {
    const {
      supName,
      supId,
      check,
      material,
    } = this.props.item;
    console.log(check);
    return (
      <div className="cardList">
        <div className="list_header">
          <div className="flex_lr_fs_c list_inner">
            <Checkbox
              checked={check}
              onChange={e => this.props.goodStore.warpCheck(e, supId)}
            />
            <p>{supName}</p>
          </div>
        </div>
        {
          material.map((item, index) => {
            const {
              name,
              _id,
              money,
              until,
              count,
              check,
            } = item;
            return (
              <div className="flex_lr_fs_c list_info" key={_id} >
                <Checkbox
                  checked={check}
                  onChange={e => this.props.goodStore.innerCheck(e, supId, _id)}
                />
                <div className="flex_lr_fs_c info_item">
                  <img src={pic} alt="" />
                  <div className="flex_tb_sb_n infos">
                    <p>{name}</p>
                    <div className="flex_lr_sb_n">
                      <p>${money}/{until}</p>
                      <ARButton
                        count={count}
                        index={index}
                        item={item}
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
  item: PropTypes.object.isRequired,
};

export default CardList;

