import React from 'react';
import PropTypes from 'prop-types';

function InfoList(props) {
  const { item } = props;
  const { title, list } = item;
  return (
    <div className="info_list">
      <p className="title">
        <span>{title}</span>
      </p>
      <ul className="list_item">
        {list.map(({ text }) => (
          <li className="flex_tb_c_c">
            <span className="img" />
            <span className="text">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
InfoList.propTypes = {
  item: PropTypes.object.isRequired,
};

export default InfoList;
