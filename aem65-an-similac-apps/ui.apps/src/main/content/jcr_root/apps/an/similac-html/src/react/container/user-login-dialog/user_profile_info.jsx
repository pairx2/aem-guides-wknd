
import * as React from "react";
import ProfileMenu from '../../container/profile-menu';

class UserProfileInfo extends React.Component {
 
  render() {
   const data = window.jsonProfileNavData || {}
    return (
      <ProfileMenu data={data}/>
    );
  }
}

export default UserProfileInfo;
