import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
/* eslint-disable */
import { post } from '@util/http';
import OrderNavBar from '@components/OrderNavBar';
import OrderList from '@components/OrderList';
import SlideBar from './component/slideBar';
/* eslint-disable */
import './assets/style.less';

class PruchaseOrder extends React.Component {
  state = {
    orderList: [], // 采购订单列表
    open: false,
    pageSize: 8, // 当前向后台发送时所取的数量值
    pageNum: 1, // 设置当前的页数
    showTip: false, // 是否显示是否正在加载中。。。
    endTip: false, // 是否显示已经没有更多数据
    hasMore: true, // 当滚动到底部时是否还可以继续向后台请求更多数据的一个阀门
  }
  // fiId 采购订单的唯一id
  // fsSupplierName 供就商 fsPurchaseGUID 网上订单号 fsArrivalDate 到货日期 fdPurchaseTotAmt 加税合计 fdPurchaseTaxAmt 税额
  // fdPurchaseMoneyAmt 不函税
  // fiBillStatus 1 代表已提交 0 未提交
  // fiSaleClose 1 代表代确认 2 已拒绝  4 已确认
  // 已提交并且已确认才有确认入库
  componentDidMount() {
    this.getOrderList();
  }
  getOrderList = () => {
    const {
      pageSize, // 需要加载的页数
      pageNum, // 当前加载第几页
      hasMore, // 是否还需要继续加载
      orderList
    } = this.state;
    // 防止加载到底部的时候多次加载，初始化为true,当为false则不进行请求
    if (!hasMore) return;
    // 一旦通过加载，则马上把hasMore设置为false,否则会形成重复请求
    this.setState({
      hasMore: false,
    });
    // 向后台发送请求
    post('wap/purchase/list', {}, { pageNum, pageSize }).then(({ data }) => {
      const newData = data.colContent.map(({
        fiId, // 采购订单的唯一id
        fdPurchaseTotAmt, // 加税合计
        fsSupplierName, // 供就商
        fsPurchaseGUID, // 网上订单号
        ifsArrivalDate, // fsArrivalDate
        fiBillStatus, // 1 代表已提交 0 未提交
        fiSaleClose, // 1 代表代确认 2 已拒绝  4 已确认
      }) => {
        let text;
        let color;
        if (fiBillStatus === 1 && fiSaleClose === 1) {
          text = '已提交-待确认';
          color = '#FF6050'
        } else if (fiBillStatus === 1 && fiSaleClose === 4) {
          text = '已提交-已确认';
          color = '#70BC46'
        }
        return {
          text,
          color,
          fiId,
          fdPurchaseTotAmt,
          fsSupplierName,
          ifsArrivalDate,
          fsPurchaseGUID
        };
      });
      // isHasMore是一个总输纽，当请求来的数据长度大于等于页数的长度，说明后台还有更多的数据，则返回true
      const isHasMore = data.colContent.length >= pageSize;
      this.setState({
        orderList: orderList.concat(newData),
        pageNum: pageNum + (isHasMore ? 1 : 0), // 如果有更多数据，则把页码加1
        hasMore: isHasMore, // 是否还可以继续加载能过isHasMore来进行判断
        // 是否显示加载中。。如果isHasMore为true,说明还有更多数据，可以显示继续加载
        showTip: isHasMore ? true : false, // eslint-disable-line
        // 是否已经加载完毕, 如果 isHasMore为true,说明还有更多数据，则不显示加载完毕
        endTip: isHasMore ? false : true, // eslint-disable-line
      });
    });
  }
  onOpenChange = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  addChange = () => {

  }
  render() {
    const { showTip, hasMore, endTip, orderList } = this.state;
    return (
      <div className="purchaseOrder inner_body">
        <OrderNavBar
          onOpenChange={this.onOpenChange}
          addChange={this.addChange}
          placeholder="供应商 单号 单据日期"
        />
        <div>
          <InfiniteScroll
            height="12.44rem"
            next={this.getOrderList}
            hasMore={hasMore}
            loader={
              showTip ?
                <p className="noMore">
                  <b>加载更多物料中...</b>
                </p> : null
            }
            endMessage={
              endTip ?
                <p className="noMore">
                  <b>没有更多数据了</b>
                </p>
                : null
            }
          >
            {
              orderList.size === 0
                ?
                null
                :
                orderList.map(item => (
                  <OrderList orderItem={item} key={item.fiId} />
                ))

            }
          </InfiniteScroll>

        </div>
        <SlideBar open={this.state.open} onOpenChange={this.onOpenChange} />
      </div>
    );
  }
}

export default PruchaseOrder;

