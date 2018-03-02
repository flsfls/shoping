import React from 'react';
import PropTypes from 'prop-types';
import './assets/style.less';

function EnterList(props) {
  const { item } = props;
  const { title, list } = item;
  return (
    <div className="enter_list">
      <p className="title">{title}</p>
      <ul className="list_item">
        {list.map(({ text }) => (
          <li className="flex_tb_sb_c">
            <span className="img" />
            <span className="text">{text}</span>
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
