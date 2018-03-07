import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '@components/NavBar' // eslint-disable-line
import LibraryList from '@components/LibraryList' // eslint-disable-line
import AddGood from '../AddGood';
import './assets/style.less';

class AddPuchaseLibrary extends React.Component {
  componentWillMount() {
    // will did
  }
  render() {
    return (
      <div className="inner_body add_puchase_library">
        <NavBar
          title={`新增${sessionStorage.title}`}
        />
        <LibraryList />
        <Route path="/home/wareHousing/addPuchaseLibrary/addGood" component={AddGood} />
      </div>
    );
  }
}

export default AddPuchaseLibrary;
