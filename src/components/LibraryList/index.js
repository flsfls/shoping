import React from 'react';
import { Link } from 'react-router-dom';
import { DatePicker, Picker } from 'antd-mobile';
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
import './style.less';

class LibraryList extends React.Component {
  constructor(props) {
    super(props);
    const nowTimeStamp = Date.now() + (1000 * 60 * 60 * 24);
    const now = new Date(nowTimeStamp);
    this.state = {
      shopValue: '',
      library: '',
      protTime: now,
    };
  }

  render() {
    const { shopValue, protTime, library } = this.state;
    const shopSelect = [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ];
    const librarySelect = [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ];
    const OrderDate = ({ left, extra, onClick }) => (
      <div onClick={onClick} className="list_item">
        <div className="flex_lr_sb_c extra">
          <span>{left}</span>
          <span className="item">{extra}</span>
        </div>
      </div>
    );
    return (
      <div className="library_list">
        <Picker
          value={shopValue}
          onChange={v => this.setState({ shopValue: v })}
          title="供应商"
          cols={1}
          data={shopSelect}
          className="forss"
        >
          <OrderDate left="供应商" />
        </Picker>
        <DatePicker
          mode="date"
          title="单据日期"
          value={protTime}
          onChange={protTime => this.setState({ protTime })}
        >
          <OrderDate left="单据日期" />
        </DatePicker>
        <Picker
          value={library}
          onChange={v => this.setState({ library: v })}
          title="仓库"
          cols={1}
          data={librarySelect}
          className="forss"
        >
          <OrderDate left="仓库" />
        </Picker>
        <div className="mark flex_lr_sb_c">
          <span>备注</span>
          <input placeholder="请填写备注" />
        </div>
        <div className="mark flex_lr_sb_c">
          <span>订单金额</span>
          <span className="money">¥ 0.00</span>
        </div>
        <Link to="/home/wareHousing/addPuchaseLibrary/addGood" >
          <div className="mark flex_lr_sb_c">
            <span>品项清单</span>
            <div className="flex_lr_c_c">
              <CustomIcon type="libraryadd" size="xs" />
              <span className="addgood">点击添加品项</span>
            </div>
            <span>共0款</span>
          </div>
        </Link>
        <button>
          保存
        </button>
      </div>
    );
  }
}

export default LibraryList;
