import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Picker } from 'antd-mobile';
import CustomIcon from '@components/CustomIcon';  // eslint-disable-line
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
      recevieTime: now,
      pickerValue: '',
      status: [
        { text: '全部', choose: false },
        { text: '已提交', choose: false },
        { text: '未提交', choose: false },
        { text: '已取消', choose: false },
        { text: '已入库', choose: false },
      ],
    };
  }
  chooseStatus = (index) => {
    const newStatus = this.state.status.map((item, mapIndex) => {
      const listItem = item;
      if (index === mapIndex) {
        listItem.choose = true;
        return listItem;
      }
      listItem.choose = false;
      return listItem;
    });
    this.setState({
      status: newStatus,
    });
  }

  cancel = () => {
    const cancelStatus = this.state.status.map((item) => {
      const listItem = item;
      listItem.choose = false;
      return listItem;
    });
    this.setState({
      startProtTime: '',
      endPortTime: '',
      recevieTime: '',
      pickerValue: '',
      status: cancelStatus,
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
    const {
      recevieTime,
      startProtTime,
      endPortTime,
      pickerValue,
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
            value={pickerValue}
            onChange={v => this.setState({ pickerValue: v })}
            title="请选择供应商"
            cols={1}
            data={shopName}
            className="forss"
          >
            <OrderDate left="请选择供应商" />
          </Picker>

          <DatePicker
            mode="date"
            title="到货日期"
            value={recevieTime}
            onChange={recevieTime => this.setState({ recevieTime })}
          >
            <OrderDate left="到货日期" />
          </DatePicker>
          <p className="portStatus">单据状态</p>
          <ul className="status">
            {this.state.status.map((item, index) => (
              <li
                className={item.choose ? 'active' : ''}
                onClick={() => this.chooseStatus(index)}
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
