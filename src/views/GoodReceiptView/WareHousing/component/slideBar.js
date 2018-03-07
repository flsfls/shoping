import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Picker } from 'antd-mobile';
import OrderSlideBar from '@components/OrderSlideBar'; // eslint-disable-line


class SlideBar extends React.Component {
  constructor(props) {
    super(props);
    /**
     * @constant nowTimeStamp 当前时间加一天
     * @constant now 转成日期格式
     */
    const nowTimeStamp = Date.now() + (1000 * 60 * 60 * 24);
    const now = new Date(nowTimeStamp);
    this.state = {
      startProtTime: now,
      endPortTime: now,
      shopValue: '',
      libraryValue: '',
      orderType: [
        { text: '全部', choose: false },
        { text: '领料单', choose: false },
        { text: '退料单', choose: false },
      ],
      orderStatus: [
        { text: '全部', choose: false },
        { text: '未审核', choose: false },
        { text: '已审核', choose: false },
      ],
    };
  }
  chooseStatus = (index, flag) => {
    const List = flag === 'orderType' ? this.state.orderType : this.state.orderStatus;
    const newStatus = List.map((item, mapIndex) => {
      const listItem = item;
      if (index === mapIndex) {
        listItem.choose = true;
        return listItem;
      }
      listItem.choose = false;
      return listItem;
    });
    this.setState({
      [flag]: newStatus,
    });
  }

  cancel = () => {
    const orderType = this.state.orderType.map((item) => {
      const listItem = item;
      listItem.choose = false;
      return listItem;
    });
    const orderStatus = this.state.orderStatus.map((item) => {
      const listItem = item;
      listItem.choose = false;
      return listItem;
    });
    this.setState({
      startProtTime: '',
      endPortTime: '',
      shopValue: '',
      libraryValue: '',
      orderType,
      orderStatus,
    });
  }
  render() {
    const shopName = [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ];
    const library = [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ];
    const {
      startProtTime,
      endPortTime,
      shopValue,
      libraryValue,
    } = this.state;
    const { open } = this.props;
    const OrderDate = ({ left, extra, onClick }) => (
      <div onClick={onClick} className="list_item">
        <div className="flex_lr_sb_c list_item_inner">
          <span>{left}</span>
          <span className="item">{extra}</span>
        </div>
      </div>
    );
    const Slidebar = () => (
      <div className="receipt_sildebar">
        <p className="title">查询</p>
        <div className="content">
          <DatePicker
            mode="date"
            title="开始单据日期"
            value={startProtTime}
            onChange={startProtTime => this.setState({ startProtTime })}
          >
            <OrderDate left="开始单据日期" />
          </DatePicker>
          <DatePicker
            mode="date"
            title="结束单据日期"
            value={endPortTime}
            onChange={endPortTime => this.setState({ endPortTime })}
          >
            <OrderDate left="结束单据日期" />
          </DatePicker>
          <Picker
            value={shopValue}
            onChange={v => this.setState({ shopValue: v })}
            title="请选择供应商"
            cols={1}
            data={shopName}
            className="forss"
          >
            <OrderDate left="请选择供应商" />
          </Picker>

          <Picker
            value={libraryValue}
            onChange={v => this.setState({ libraryValue: v })}
            title="请选择仓库"
            cols={1}
            data={library}
            className="forss"
          >
            <OrderDate left="请选择仓库" />
          </Picker>
          <p className="portStatus">单据类型</p>
          <ul className="status">
            {this.state.orderType.map((item, index) => (
              <li
                className={item.choose ? 'active' : ''}
                onClick={() => this.chooseStatus(index, 'orderType')}
                key={item.text}
              >
                {item.text}
              </li>
            ))}
          </ul>
          <p className="portStatus">单据状态</p>
          <ul className="status">
            {this.state.orderStatus.map((item, index) => (
              <li
                className={item.choose ? 'active' : ''}
                onClick={() => this.chooseStatus(index, 'orderStatus')}
                key={item.text}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="button_box">
          <button onClick={this.cancel} >
            清除
          </button>
          <button>
            确定
          </button>
        </div>
      </div>
    );
    return (
      <OrderSlideBar
        onOpenChange={this.props.onOpenChange}
        element={<Slidebar />}
        open={open}
      />
    );
  }
}

/**
 * @param {boolean}  open 初始化是否打开slidebar
 * @param {object}  history 非路由组件，中的路由信息
 * @method onOpenChange 父组件传入改变slidebar的toggle
 */
SlideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};

export default SlideBar;
