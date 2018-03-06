import React from 'react';
import EnterList from '@components/EnterList'; // eslint-disable-line
import One from './assets/01@2x.png';
import Two from './assets/02@2x.png';
import Three from './assets/03@2x.png';
import Four from './assets/04@2x.png';
import Five from './assets/05@2x.png';
import Six from './assets/06@2x.png';

class GoodReceipt extends React.Component {
  componentDidMount() {
    // will
  }

  render() {
    const data = [
      {
        title: '购管理',
        list: [
          {
            img: One,
            text: '自采订单',
          },
          {
            img: Two,
            text: '采购订单',
            route: '/home/purchaseOrder',
          },
        ],
      },
      {
        title: '入库管理',
        list: [
          {
            img: Three,
            text: '采购入库单',
            route: '/home/wareHousing',
          },
          {
            img: Four,
            text: '采购退货单',
          },
          {
            img: Five,
            text: '入库列表',
          },
          {
            img: '',
            text: '暂无资料',
          },
          {
            img: '',
            text: '暂无资料',
          },
          {
            img: '',
            text: '暂无资料',
          },
          {
            img: '',
            text: '暂无资料',
          },
          {
            img: Six,
            text: '即时库存',
          },
        ],
      },
    ];
    return (
      <div>
        {data.map((item, index) => <EnterList item={item} key={index} />)}
      </div>
    );
  }
}

export default GoodReceipt;

