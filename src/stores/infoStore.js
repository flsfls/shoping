import { observable, action } from 'mobx';
import { fromJS, Map } from 'immutable';

class Info {
  @observable addressList = fromJS([]);
  @observable initAddress = Map({
    '_id': '5a7a8fd1ea4fafc71e85d2c0',  // eslint-disable-line
    'address': '上海上海浦东新区杨高南路428888号由由世纪广场1号楼', // eslint-disable-line
    'shopName': '百味云1', // eslint-disable-line
    'telephone': '10000000001' // eslint-disable-line
  })
  @action changeInitAddress(address) {
    this.initAddress = Map(address);
  }
  @action addAddress(address) {
    this.addressList = this.addressList.concat(fromJS(address));
  }
  @action cleanAddress() {
    this.addressList = this.addressList.clear();
  }
  @action editAddress(id, state) {
    this.addressList.forEach((item, index) => {
      if (item.get('_id') === id) {
        this.addressList = this.addressList.set(index, Map({ _id: id, check: true, ...state }));
      }
    });
  }
  @action deleteAddress(id) {
    this.addressList.forEach((item, index) => {
      if (item.get('_id') === id) {
        this.addressList = this.addressList.splice(index, 1);
      }
    });
  }
  @action editAddAddress(state) {
    this.addressList = this.addressList.push(Map({ _id: Math.random() * 1000, ...state }));
  }
}

export default Info;
