import React from 'react';
import EnterList from '@components/EnterList'; // eslint-disable-line

class Library extends React.Component {
  componentDidMount() {
    // will
  }

  render() {
    const data = [
      {
        title: '购管理',
        list: [
          {
            img: '',
            text: '自采订单',
          },
          {
            img: '',
            text: '采购订单',
          },
        ],
      },
      {
        title: '入库管理',
        list: [
          {
            img: '',
            text: '采购入库单',
          },
          {
            img: '',
            text: '采购退货单',
          },
          {
            img: '',
            text: '库列表',
          },
          {
            img: '',
            text: '即时库存',
          },
        ],
      },
    ];
    return (
      <div>
        {data.map(item => <EnterList item={item} />)}
      </div>
    );
  }
}

export default Library;
