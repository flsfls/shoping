import React from 'react';
import NavBar from '@components/NavBar'; // eslint-disable-line
import GoodClassfi from '@components/GoodClassfi'; // eslint-disable-line
import './assets/style.less';

class ChooseGood extends React.Component {
  componentDidMount() {
    // will
  }
  render() {
    return (
      <div className="chooseGood inner_body">
        <NavBar
          title="选择品项"
        />
        <GoodClassfi />
      </div>
    );
  }
}

export default ChooseGood;
