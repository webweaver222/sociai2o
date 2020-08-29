import React from "react";
import { connect } from "react-redux";
import "./UserMenu.sass";

const UserMenu = ({ user, dropdown, onIconClick }) => {
  const pic = user.avatarUrl
    ? user.avatarUrl
    : "../../src/resources/img/qm.png";

  const ddStyle = !dropdown ? { display: "none" } : { display: "block" };

  return (
    <div
      className="user-menu"
      style={{ backgroundImage: `url(${pic})` }}
      onClick={e => {
        e.stopPropagation();
        onIconClick();
      }}
    >
      <div
        className="dropdown"
        style={ddStyle}
        //onClick={e => e.stopPropagation()}
      >
        <ul>
          <li>My page</li>
          <li>Profile Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user }, profile: { dropdown } }) => ({
  user,
  dropdown
});

const mapDispatchToProps = dispatch => ({
  onIconClick: () => dispatch("SHOW_DROPDOWN")
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
