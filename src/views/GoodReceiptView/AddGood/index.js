import React from 'react';
import { Route, Link } from 'react-router-dom';
import ChooseGood from '../ChooseGood';
import NavBar from '@components/NavBar'; // eslint-disable-line
import CustomIcon from '@components/CustomIcon'; // eslint-disable-line
import OrderGoodList from '@components/OrderGoodList' // eslint-disable-line
import OrderGoodButton from '@components/OrderGoodButton'; // eslint-disable-line
import './assets/style.less';

class AddGood extends React.Component {
  componentWillMount() {
    // will did
  }
  rightDom = () => (
    <Link to="/home/wareHousing/addPuchaseLibrary/addGood/chooseGood">
      <CustomIcon type="goodadd" key="first" size="xs" />
    </Link>
  )
  render() {
    return (
      <div className="add_good inner_body">
        <NavBar
          title="添加品项"
          right={this.rightDom()}
        />
        <OrderGoodList />
        <OrderGoodButton />
        <Route path="/home/wareHousing/addPuchaseLibrary/addGood/chooseGood" component={ChooseGood} />
      </div>
    );
  }
}

export default AddGood;
