import React from 'react';
import PropTypes from 'prop-types';
import CustomIcon from '@components/CustomIcon'  // eslint-disable-line
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const Header = ({ number }) => (
  <header className="flex_lr_sb_c nav_bar">
    <Link to="/home/classification" style={{ height: '100%' }}>
      <div className="flex_tb_sb_c">
        <CustomIcon size="sm" type="another" />
        <span className="icon_text">分类{number}</span>
      </div>
    </Link>
    <div className="center">
      <div className="flex_lr_fs_c search_box">
        <CustomIcon size="xxs" type="searchs" />
        <input placeholder="搜索商品" type="text" />
      </div>
    </div>
    <Link to="/home/shopCard" style={{ height: '100%' }}>
      <div className="flex_tb_sb_c right">
        <CustomIcon size="sm" type="card" />
        <span className="icon_text">购物车</span>
      </div>
    </Link>
  </header>
);

const aa = inject(stores => (
  { number: stores.goodStore.number }
))(observer(Header));

Header.propTypes = {
  number: PropTypes.number.isRequired,
};


export default aa;
