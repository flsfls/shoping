import { Toast } from 'antd-mobile';

function validationAddress({ shopName, address, telephone }) {
  const flag = [shopName, address, telephone].every(item => item !== '');
  if (flag) {
    return true;
  }
  if (shopName === '') {
    Toast.info('请输入收货人', 1);
  } else if (address === '') {
    Toast.info('请输入手机号码', 1);
  } else if (telephone === '') {
    Toast.info('请输入手机号码', 1);
  }
  return false;
}

function demo() {
  // will do
}

export { validationAddress, demo };
