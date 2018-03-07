import React from 'react';
import NavBar from '@components/NavBar' // eslint-disable-line
import LibraryList from '@components/LibraryList' // eslint-disable-line
import './assets/style.less';

class AddBackLibrary extends React.Component {
  componentWillMount() {
    // will did
  }
  render() {
    return (
      <div className="inner_body add_back_library">
        <NavBar
          title={`新增${sessionStorage.title}`}
        />
        <LibraryList />
      </div>
    );
  }
}

export default AddBackLibrary;
