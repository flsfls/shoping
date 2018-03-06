import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './assets/style.less';

function EnterList(props) {
  const { item } = props;
  const { title, list } = item;
  return (
    <div className="enter_list">
      <p className="title">{title}</p>
      <ul className="list_item">
        {list.map(({ img, text, route }, index) => (
          <li key={index}>
            <Link style={{ height: '100%' }} className="flex_tb_sb_c" to={{ pathname: route }} >
              {
                img === '' ? <span className="img" /> : <img src={img} alt="" />
              }
              <span className="text">{text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
EnterList.propTypes = {
  item: PropTypes.object.isRequired,
};

export default EnterList;
