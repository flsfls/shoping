import React from 'react';
import { List } from 'antd-mobile';
import InfoList from './component/InfoList';
import MyImg from './assets/my.jpg';
import './assets/style.less';


const { Item } = List;

class My extends React.Component {
  componentDidMount() {
    // will do
  }
  render() {
    const data = [
      {
        title: '报表',
        list: [
          {
            img: '',
            text: '收发明细',
          },
          {
            img: '',
            text: '品项余额',
          },
          {
            img: '',
            text: '成本差异',
          },
          {
            img: '',
            text: '采购排行',
          },
        ],
      },
      {
        title: '基础档案',
        list: [
          {
            img: '',
            text: '我的物料',
          },
          {
            img: '',
            text: '供应商',
          },
          {
            img: '',
            text: '菜品成本卡',
          },
        ],
      },
    ];
    return (
      <div className="my">
        <div className="my_info flex_lr_fs_c">
          <img src={MyImg} alt="" />
          <p>周志祥</p>
        </div>
        {data.map(item => <InfoList item={item} />)}
        <List className="my-list">
          <Item arrow="horizontal" onClick={() => { }}>设置</Item>
          <Item extra="99+" arrow="horizontal" onClick={() => { }}>系统消息</Item>
        </List>
      </div>
    );
  }
}

export default My;
