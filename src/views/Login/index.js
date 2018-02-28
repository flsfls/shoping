import React from 'react';
import PropTypes from 'prop-types';
import Logo from './assets/bizLogo.jpg';
import { onChange } from '../../util/decoratorMixin'; // eslint-disable-line
import './assets/style.less';

@onChange
class Login extends React.Component {
  state = {
    shopName: '',
    userName: '',
    passWord: '',
  }
  componentDidMount() {
    // will do
  }

  login = () => {
    this.props.history.replace('/home');
  }

  render() {
    const { shopName, userName, passWord } = this.state;
    return (
      <div className="login flex_tb_fs_c">
        <img src={Logo} alt="" />
        <input
          placeholder="请输入商户名"
          value={shopName}
          onChange={e => this.onChange(e, 'shopName')}
        />
        <input
          placeholder="请输入用户名"
          value={userName}
          onChange={e => this.onChange(e, 'userName')}
        />
        <input
          placeholder="请输入密码"
          value={passWord}
          onChange={e => this.onChange(e, 'passWord')}
        />
        <button onClick={this.login}>登录</button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
