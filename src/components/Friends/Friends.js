import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./friends.sass";

const Friends = props => {
  return (
    <div className="friends">
      <ul className="section-block">
        <div className="forward"></div>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/girl.jpg')" }}
          >
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/pepsi.jpg')" }}
          >
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/girl2.jpg')" }}
          >
            <div className="name">Morana</div>
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/girl.jpg')" }}
          >
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/pepsi.jpg')" }}
          >
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/girl2.jpg')" }}
          >
            <div className="name">Morana</div>
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/girl.jpg')" }}
          >
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/pepsi.jpg')" }}
          >
            <div className="shadow"></div>
          </div>
        </li>
        <li>
          <div
            className="pic"
            style={{ backgroundImage: "url('src/resources/img/girl2.jpg')" }}
          >
            <div className="name">Morana</div>
            <div className="shadow"></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
