import { observable, action } from 'mobx';
import { fromJS } from 'immutable';

class PuchaseOrder {
  @observable fsSupplierList = fromJS([]);
  @observable puchaseOrderList = fromJS([]);
  @action addFsSupplierList(supplierList) {
    this.fsSupplierList = fromJS(supplierList);
  }
  @action addPuchaseOrderList(puchaseOrderList) {
    this.fsSupplierList = this.fsSupplierList.cancat(fromJS(puchaseOrderList));
  }
}

export default PuchaseOrder;
