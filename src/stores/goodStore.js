import { observable, action, computed } from 'mobx';
import { fromJS, List, Map } from 'immutable';

class ShopStore {
  @observable goodList = fromJS([]);
  @observable goodStore = List();
  @computed get totalMoney() {
    let money = 0;
    this.goodStore.forEach((good) => {
      good.get('material').forEach((materialItem) => {
        if (materialItem.get('check') === true) {
          money += materialItem.get('count') * materialItem.get('money');
        }
      });
    });
    return money;
  }

  @action cleanGoodStore() {
    this.goodStore = this.goodStore.clear();
    this.goodList.forEach((item, index) => {
      this.goodList = this.goodList.setIn([index, 'count'], 0);
    });
  }
  @action warpCheck(e, supId) {
    const { checked } = e.target;
    this.goodStore.forEach((item, index) => {
      if (supId === item.get('supId')) {
        const newMaterial = item.get('material').map(item => item.set('check', checked));
        this.goodStore = this.goodStore.setIn([index, 'check'], checked).setIn([index, 'material'], newMaterial);
      }
    });
  }
  @action innerCheck(e, supId, _id) {
    const { checked } = e.target;
    let indexFlag;
    this.goodStore.forEach((item, index) => {
      if (supId === item.get('supId')) {
        indexFlag = index;
        const material = item.get('material');
        material.forEach((materialItem, materialIndex) => {
          if (materialItem.get('_id') === _id) {
            this.goodStore = this.goodStore.setIn([index, 'material', materialIndex, 'check'], checked);
          }
        });
        const isAllChecked = this.goodStore.getIn([indexFlag, 'material']).every(item => item.get('check') === true);
        if (isAllChecked) {
          this.goodStore = this.goodStore.setIn([indexFlag, 'check'], true);
        } else {
          this.goodStore = this.goodStore.setIn([indexFlag, 'check'], false);
        }
      }
    });
  }
  @action addGoodList(goodList) {
    this.goodList = this.goodList.concat(fromJS(goodList));
  }
  @action changeGoodCount(good, flag) { // eslint-disable-line
    let index; // eslint-disable-line
    for (let i = 0; i < this.goodList.size; i++) { // eslint-disable-line
      const goodlistItem = this.goodList.get(i);
      const goodlistItemId = goodlistItem.get('_id');
      const goodlistItemCount = goodlistItem.get('count');
      if (goodlistItemId === good._id) {  // eslint-disable-line
        index = i;
        this.goodList = this.goodList.setIn([i, 'count'], goodlistItemCount + flag);
        break;
      }
    }
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    const goodStore = this.goodList.get(index).set('check', true);
    const supId = goodStore.get('shopID');
    const supName = goodStore.get('shopName');
    const count = goodStore.get('count');
    const _id = goodStore.get('_id');  // eslint-disable-line

    const Nmaterial = List().push(goodStore);
    const NgoodStoreItem = Map({
      supId,
      supName,
      check: true,
      material: Nmaterial,
    });

    if (this.goodStore.size === 0) {
      this.goodStore = this.goodStore.push(NgoodStoreItem);
    } else {
      for (let m = 0; m < this.goodStore.size; m++) {  // eslint-disable-line
        const goodStoreItem = this.goodStore.get(m);
        if (goodStoreItem.get('supId') === supId) {
          const material = goodStoreItem.get('material');
          for (let j = 0; j < material.size; j++) {  // eslint-disable-line
            const materialItem = material.get(j);
            const materialItemId = materialItem.get('_id');
            if (materialItemId === _id) {
              if (count === 0) {
                this.goodStore = this.goodStore.updateIn([m, 'material'], item => item.splice(j, 1));
                if (material.size === 1) this.goodStore = this.goodStore.splice(m, 1);
              } else {
                this.goodStore = this.goodStore.setIn([m, 'material', j, 'count'], count);
              }
              return;
            }
          }
          this.goodStore = this.goodStore.updateIn([m, 'material'], item => item.push(goodStore));
          return;
        }
      }
      this.goodStore = this.goodStore.push(NgoodStoreItem);
    }
  }
}

export default ShopStore;
