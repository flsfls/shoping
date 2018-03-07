import React from 'react';
import { List } from 'antd-mobile';
import './style.less';

const { Item } = List;

class GoodClassfi extends React.Component {
  componentWillMount() {
    // will
  }
  render() {
    return (
      <div className="good_classfi">
        <p className="title">全部分类</p>
        <List>
          <Item>肉类 【4】</Item>
          <Item>海鲜 【4】</Item>
          <Item>蔬果 【4】</Item>
        </List>
      </div>
    );
  }
}

export default GoodClassfi;
