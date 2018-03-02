import React from 'react';
import EnterList from '@components/EnterList'; // eslint-disable-line

class GoodReceipt extends React.Component {
  componentDidMount() {
    // will
  }

  render() {
    const data = [
      {
        title: '收银出库',
        list: [{
          img: '',
          text: '自动出货',
        }],
      },
      {
        title: '领料出库',
        list: [
          {
            img: '',
            text: '领料单',
          },
          {
            img: '',
            text: '退料单',
          },
          {
            img: '',
            text: '报损单',
          },
          {
            img: '',
            text: '出库列表',
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

export default GoodReceipt;

