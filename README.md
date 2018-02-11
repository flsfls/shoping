shopId : 总部 【1,2,3,4,】
shopName: 总部名称 【小肥羊总部，沙县大酒店总部，新疆拉面总部，光明顶总部】
name: 物料名称， 大白菜 += 1
money: 1-10 随机数
img: 图片地址
count: 数量 0，
until：规格 ’kg‘,’g‘,’只‘,‘件’
classifName分类： [川菜,湘菜,粤菜,鲁菜,东北菜,西北菜,浙菜,苏菜,上海菜,京菜]
classifId 分类Id [1,2,3,4,5,6,7,8,9,10]


var shopflag = 0
var classflag = 0
var shop =[
  {"shopName": "小肥羊总部", "shopId": '1'},
  {"shopName": "沙县大酒店总部", "shopId": '2'},
  {"shopName": "新疆拉面总部", "shopId": '3'},
  {"shopName": "光明顶总部", "shopId": '4'}
];
var classif = [
  {"classifName": "川菜", "classifId": '1'},
  {"classifName": "湘菜", "classifId": '2'},
  {"classifName": "粤菜", "classifId": '3'},
  {"classifName": "鲁菜", "classifId": '4'},
  {"classifName": "东北菜", "classifId": '5'},
  {"classifName": "西北菜", "classifId": '6'},
  {"classifName": "浙菜", "classifId": '7'},
  {"classifName": "苏菜", "classifId": '8'},
  {"classifName": "上海菜", "classifId": '9'},
  {"classifName": "京菜", "classifId": '10'}
];
var untilClass = ['kg','g','只','件']
for(var i =0;i<500;i++) {
  var shopId = shop[shopflag].shopId;
  var shopName = shop[shopflag].shopName;
  var until = untilClass[shopflag]
  var classifName = classif[classflag].classifName;
  var classifId = classif[classflag].classifId;
  var name = "大白菜" + i
  var money = Math.ceil(Math.random()*10)
  var count = 0
  db.shops.insert({
    "shopId": shopId,
    "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518112141328&di=a79018b79c4da8a1ef686ca7a58e69e9&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120707%2F201807-120FH3415789.jpg",
    "shopName": shopName,
    "until": until,
    "name": name,
    "money": money,
    "count": count,
    "classifName": classifName,
    "classifId": classifId,
  })
  shopflag += 1;
  if(shopflag == 4) {
    shopflag = 0;
  }
  classflag += 1
  if(classflag == 10) {
    classflag = 0
  }
}




