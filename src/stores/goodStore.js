import { observable, action, computed } from 'mobx';
import { fromJS, List, Map } from 'immutable';

/**
 * @observable {Immutable fromJS} goodList 首页下拉物料的所有数据
 * @observable {Immutable fromJS} goodListStore 存储选中后的物料数据
 * @observable {Immutable fromJS} groupStore 购物车转化格式后选中的所有物料数据
 */
class ShopStore {
  @observable goodList = fromJS([]);
  @observable goodListStore = List();
  @observable groupStore = fromJS([]);
  @observable classfiStore = fromJS([])
  @observable searchStore = fromJS([])
  @computed get totalMoney() {
    let money = 0;
    this.groupStore.forEach((good) => {
      good.get('material').forEach((materialItem) => {
        if (materialItem.get('check') === true) {
          money += materialItem.get('count') * materialItem.get('money');
        }
      });
    });
    return money;
  }

  // -----------------------------------------------------------------------------
  @action addGoodList(goodList) {
    this.goodList = this.goodList.concat(fromJS(goodList));
    this.comparsionGoodList();
  }

  @action comparsionGoodList() {
    for (let i = 0; i < this.goodList.size; i += 1) {
      const flag = (() => {
        for (let j = 0; j < this.goodListStore.size; j += 1) {
          const goodId = this.goodList.getIn([i, '_id']);
          const storeId = this.goodListStore.getIn([j, '_id']);
          const storeCount = this.goodListStore.getIn([j, 'count']);
          if (goodId === storeId) {
            this.goodList = this.goodList.setIn([i, 'count'], storeCount);
            return false;
          }
        }
        return true;
      })();
      if (flag) {
        this.goodList = this.goodList.setIn([i, 'count'], 0);
      }
    }
  }

  // -----------------------------------------------------------------------------
  /**
   * @major function 选择的物类和（册除或者增加）物料放入goodListStore中进行长时间的存储
   * @param {object} good 当前选中传入的物料，每个物料的基本属性全在其中
   * @param {number} flag 标实当前点击的是加物料操作（值为-1）,还是减物料操作 （值为1)
   */
  @action changeGoodListStore(good, flag) {
    // 把物料的数量设为1，因为一开始为0
    const addGood = good;
    addGood.count = 1;
    // 如果存储选择的物料为空的时个,直接把选择的物料push到存储选择的物料中
    if (this.goodListStore.size === 0) {
      this.goodListStore = this.goodListStore.push(Map(addGood));
    } else {
      /**
       * @variable goodListStoreId {obj} 当前循环存储选择的物料主健id
       * @variable goodListStoreCount {stirng} 当前循环存储选择的物料主健数量
       * 如果不为空，则进行循环比对，如果有相同的料物，则在此物料基础上加1，然后跳出循环
       * 如果数量==1 并且是减少操作，则把当前物料从储存物料数组中删除 把操作的储存物料存在localStorage中
       */
      for (let i = 0; i < this.goodListStore.size; i += 1) {
        const goodListStoreId = this.goodListStore.getIn([i, '_id']);
        const goodListStoreCount = this.goodListStore.getIn([i, 'count']);
        if (goodListStoreId === good._id) {
          if (goodListStoreCount === 1 && flag === -1) {
            this.goodListStore = this.goodListStore.splice(i, 1);
            localStorage.goodListStore = JSON.stringify(this.goodListStore);
            return;
          }
          this.goodListStore = this.goodListStore.setIn([i, 'count'], goodListStoreCount + flag);
          localStorage.goodListStore = JSON.stringify(this.goodListStore);
          return;
        }
      }
      // 如果没有相同的物料则向储选择的物料数组push选中的物料
      this.goodListStore = this.goodListStore.push(Map(addGood));
    }
    localStorage.goodListStore = JSON.stringify(this.goodListStore);
  }

  @action saveCacheStore(goodListStore) {
    this.goodListStore = fromJS(goodListStore);
  }

  // -----------------------------------------------------------------------------
  /**
   * @major function 点击添加物料和减少物料的操作
   * @param {object} good 当前选中传入的物料，每个物料的基本属性全在其中
   * @param {number} flag 标实当前点击的是加物料操作（值为-1）,还是减物料操作 （值为1)
   */
  @action changeGoodCount(good, flag) {
    // @major function  添加或者减少物料时，把下拉的加载所有的物料进行同样视图改变
    for (let i = 0; i < this.goodList.size; i += 1) {
      /**
       * @variable goodlistItem {obj} 当前循环下拉物料数组中的物料
       * @variable goodlistItemId {stirng} 物料中的_id主健值
       * @variable goodlistItemCount {number} 物料中的选中数量
       */
      const goodlistItem = this.goodList.get(i);
      const goodlistItemId = goodlistItem.get('_id');
      const goodlistItemCount = goodlistItem.get('count');
      // 如果传入的选中物料主健id 等于 循环出来的物料主健_id值,则下拉物料数组中比对成功的加1或1，退出循环
      if (goodlistItemId === good._id) {
        this.goodList = this.goodList.setIn([i, 'count'], goodlistItemCount + flag);
        break;
      }
    }
  }

  // -----------------------------------------------------------------------------
  /**
   * @major function 把选中后存储的物料转化成购物车需要格式的物料，只是一个group分组转化格式，转化后的的数据与goodListStore一致
   * @param {object<list>} groupStore 转化后的选中的group分组的物料
   */
  @action addGroupStore() {
    const groupGood = this.goodListStore.toJS().reduce((box, next) => {
      const item = next;
      item.check = true;
      const { shopName, shopId } = item;
      const obj = {
        shopName,
        shopId,
        check: true,
        material: [item],
      };
      if (box.length === 0) {
        box.push(obj);
      } else {
        for (let i = 0; i < box.length; i += 1) {
          if (box[i].shopId === item.shopId) {
            const materialItem = box[i].material;
            materialItem.push(item);
            return box;
          }
        }
        box.push(obj);
        return box;
      }
      return box;
    }, []);
    this.groupStore = fromJS(groupGood);
  }
  // ---------------------------------------------------------------------------
  /**
   * @major function 当点击清除购物车的时候把groupStore分组后数据与goodListStore选中的数据一并全部清除
   */
  @action cleanGoodStore() {
    this.groupStore = this.groupStore.clear();
    this.goodListStore = this.goodListStore.clear();
  }

  // -----------------------------------------------------------------------------
  /**
   * @major function groupStore分组后进行数量的改变时进行的操作，整体分组的数据格式为
   * 【
   *    {
   *     shoId: '1',shopName: '沙县总部',
   *     material: [
   *       {count: 0, name: '大白菜‘，...省略。}
   *       {count: 1, name: '大白菜2‘，...省略。}
   *     ]
   *    },
   *    {
   *     shoId: '2',shopName: '新疆拉面总部',
   *     material: [
   *       {count: 0, name: '大白菜‘，...省略。}
   *       {count: 1, name: '大白菜2‘，...省略。}
   *     ]
   *    }
   *  】
   *  @param {number} outIndex 选中分组据格式的最外层数组的index下标
   *  @param {number} innerIndex 选中分组据格式materil的index下标
   *  @param {number} flag 标识是加还是减的操作
   */
  @action changeGroupStoreCount(outIndex, innerIndex, flag) {
    /**
     * @variable goodMaterial 当前点击选中分组的当前项的关联的总部组的物料组
     * @variable goodCount  当前点选中物料组中的物料的数量
     */
    const goodMaterial = this.groupStore.getIn([outIndex, 'material']);
    const goodCount = this.groupStore.getIn([outIndex, 'material', innerIndex, 'count']);
    // 如果goodMaterial长度等于1 并且是减的操作，并且goodCount等于1的时候，把整个最外层的item项全部删除
    if (goodMaterial.size === 1 && flag === -1 && goodCount === 1) {
      this.groupStore = this.groupStore.splice(outIndex, 1);
    } else {
      // 如果goodCount = 1，并且是减的操作，把当前物料组中的当前选中的物料删除，退出
      if (goodCount === 1 && flag === -1) {
        this.groupStore = this.groupStore.updateIn([outIndex, 'material'], material => material.splice(innerIndex, 1));
        return;
      }
      // 否则最后改变当前的物料数量，根据flag
      this.groupStore = this.groupStore.setIn([outIndex, 'material', innerIndex, 'count'], goodCount + flag);
    }
  }
  // -----------------------------------------------------------------------
  /**
   * @major function 点击总店选择的勾选
   * @param {object} e checkbox event对象
   * @param {number} outIndex 当前勾选总店外层index下标
   */
  @action warpCheck(e, outIndex) {
    /**
     * @variable checked 点击勾选后返回的值
     * @variable currentMaterial 当前勾选总部的所有物料
     */
    const { checked } = e.target;
    const currentMaterial = this.groupStore.getIn([outIndex, 'material']);
    this.groupStore = this.groupStore.setIn([outIndex, 'check'], checked);
    // 循环当前勾选总部的所有物料,把勾选总部的所有物料的check值等于总部的check值
    currentMaterial.forEach((item, materialIndex) => {
      this.groupStore = this.groupStore.setIn([outIndex, 'material', materialIndex, 'check'], checked);
    });
  }
  // --------------------------------------------------------------------------
  /**
   * @major function 点击总店选择的勾选
   * @param {object} e checkbox event对象
   * @param {number} outIndex 当前勾选总店外层index下标
   * @param {number} innerIndex 当前勾选物料层index内层下标
   */
  @action innerCheck(e, outIndex, innerIndex) {
    /**
     * @variable checked 点击勾选后返回的值
     * @variable materials 当前勾选总部的所有物料组
     * @variable {boolean} isAllchecked 判断总部对应的所有物料组是否全部是勾选状态
     */
    const { checked } = e.target;
    this.groupStore = this.groupStore.setIn([outIndex, 'material', innerIndex, 'check'], checked);
    const materials = this.groupStore.getIn([outIndex, 'material']);
    const isAllchecked = materials.every(material => material.get('check') === true);
    // 如果是购选状态，则把外层的总部勾选全设为true,否则全为false
    if (isAllchecked) {
      this.groupStore = this.groupStore.setIn([outIndex, 'check'], true);
    } else {
      this.groupStore = this.groupStore.setIn([outIndex, 'check'], false);
    }
  }
  // 先比较，再次group
  @action addClassfiStore(classfi) {
    const fromClassfi = classfi;
    for (let i = 0; i < fromClassfi.length; i += 1) {
      for (let j = 0; j < this.goodListStore.size; j += 1) {
        const goodListStoreId = this.goodListStore.getIn([j, '_id']);
        const goodListStoreCount = this.goodListStore.getIn([j, 'count']);
        if (fromClassfi[i]._id === goodListStoreId) {
          fromClassfi[i].count = goodListStoreCount;
          break;
        }
      }
    }
    const groupClass = fromClassfi.reduce((totalClassfi, item) => {
      const { classifId, classifName } = item;
      const obj = {
        classifId,
        classifName,
        material: [item],
      };
      if (totalClassfi.length === 0) {
        totalClassfi.push(obj);
      } else {
        for (let i = 0; i < totalClassfi.length; i += 1) {
          if (totalClassfi[i].classifId === item.classifId) {
            const materialItem = totalClassfi[i].material;
            materialItem.push(item);
            return totalClassfi;
          }
        }
        totalClassfi.push(obj);
        return totalClassfi;
      }
      return totalClassfi;
    }, []);
    this.classfiStore = this.classfiStore.concat(fromJS(groupClass));
  }

  @action changeClassfiCount(outIndex, innerIndex, flag) {
    const classfiStoreCount = this.classfiStore.getIn([outIndex, 'material', innerIndex, 'count']);
    this.classfiStore = this.classfiStore.setIn([outIndex, 'material', innerIndex, 'count'], classfiStoreCount + flag);
  }

  @action cleanClassfiStore() {
    this.classfiStore = this.classfiStore.clear();
  }

  // searchStore -------------------------------------------------
  @action cleanSearchStore() {
    this.searchStore = this.searchStore.clear();
  }
  @action addSearchStore(search) {
    const searchStore = search;
    for (let i = 0; i < searchStore.length; i += 1) {
      for (let j = 0; j < this.goodListStore.size; j += 1) {
        const goodListStoreId = this.goodListStore.getIn([j, '_id']);
        const goodListStoreCount = this.goodListStore.getIn([j, 'count']);
        if (searchStore[i]._id === goodListStoreId) {
          searchStore[i].count = goodListStoreCount;
          break;
        }
      }
    }
    this.searchStore = this.searchStore.concat(fromJS(searchStore));
  }

  @action changeSearchStoreCount(index, flag) {
    const currentCount = this.searchStore.getIn([index, 'count']);
    this.searchStore = this.searchStore.setIn([index, 'count'], currentCount + flag);
  }
}

export default ShopStore;
