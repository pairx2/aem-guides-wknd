import * as React from "react";
import UserProfileInfo from './user_profile_info';

const UserProfile = () => {
  
  const styleObject = {
    "height": jQuery(document).height() - 150
  }
  return (
      <div id="header-profile-menu-container" className="container user_profile" style={styleObject}>
        <UserProfileInfo />
      </div>
  );

}

export default UserProfile;
