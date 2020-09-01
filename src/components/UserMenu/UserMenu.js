import React from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import "./UserMenu.sass";

import withService from "../hoc/withService";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions";

const UserMenu = ({ user, dropdown, onIconClick, onLogout, onHomePage }) => {
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
          <li onClick={() => onHomePage(user.username)}>My page</li>
          <li>Profile Settings</li>
          <li onClick={onLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user }, profile: { dropdown } }) => ({
  user,
  dropdown
});

const mapDispatchToProps = (dispatch, { service, history }) => ({
  onIconClick: () => dispatch("SHOW_DROPDOWN"),
  onLogout: () => dispatch(logout(service)),
  onHomePage: username => history.push(`/profile/${username}`)
});

export default compose(
  withRouter,
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(UserMenu);
