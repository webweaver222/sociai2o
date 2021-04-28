import React from "react";
import { connect } from "react-redux";
import { compose } from "utils";
import "./UserMenu.sass";

import { withService, withSocket } from "../hoc/withService";
import { withRouter } from "react-router-dom";
import { logout } from "actions/auth";
import { closeConn } from "actions/socket";

const UserMenu = ({
  user,
  dropdown,
  onIconClick,
  onLogout,
  onHomePage,
  closeSocket,
}) => {
  const pic = user.avatarUrl ? user.avatarUrl : "/src/resources/img/qm.png";

  const ddStyle = !dropdown ? { display: "none" } : { display: "block" };

  return (
    <div
      className="user-menu"
      style={{ backgroundImage: `url(${pic})` }}
      onClick={(e) => {
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
          <li
            onClick={() => {
              onLogout();
              closeSocket();
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user }, profile: { dropdown } }) => ({
  user,
  dropdown,
});

const mapDispatchToProps = (dispatch, { service, socket, history }) => ({
  onIconClick: () => dispatch("SHOW_DROPDOWN"),
  onLogout: () => dispatch(logout(service)),
  closeSocket: () => dispatch(closeConn(socket)(history)),
  onHomePage: (username) => history.push(`/profile/${username}`),
});

export default compose(
  withRouter,
  withService,
  withSocket,
  connect(mapStateToProps, mapDispatchToProps)
)(UserMenu);
