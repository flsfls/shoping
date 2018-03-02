import React from 'react';
import EnterList from '@components/EnterList'; // eslint-disable-line

class Inventory extends React.Component {
  componentDidMount() {
    // will
  }

  render() {
    const data = [
      {
        title: '盘点管理',
        list: [
          {
            img: '',
            text: '新增盘点',
          },
          {
            img: '',
            text: '盘点列表',
          },
          {
            img: '',
            text: '盘盈单',
          },
          {
            img: '',
            text: '盘亏单',
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

export default Inventory;

