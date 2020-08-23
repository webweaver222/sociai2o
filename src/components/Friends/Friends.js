import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./friends2.sass";

const Friends = props => {
  const list = useRef(null);

  const [style, setStyle] = useState("");

  let srollable = true;

  function scrollTo(element, to, duration) {
    let tm;
    if (duration <= 0) {
      clearTimeout(tm);
      return (srollable = true);
    }
    var difference = to - element.scrollTop;
    var perTick = (difference / duration) * 10;

    tm = setTimeout(function () {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
    }, 10);
  }

  const onForward = e => {
    e.stopPropagation();
    if (srollable) {
      srollable = false;
      scrollTo(
        list.current.parentNode,
        list.current.parentNode.scrollTop +
          list.current.parentNode.clientHeight,
        600
      );
    }
  };

  const onBack = e => {
    e.stopPropagation();
    if (srollable) {
      srollable = false;
      scrollTo(
        list.current.parentNode,
        list.current.parentNode.scrollTop -
          list.current.parentNode.clientHeight,
        600
      );
    }
  };

  const onHover = () => {
    if (list.current.clientHeight >= window.innerHeight * 0.9) {
      setStyle("hovered");
    }
  };

  return (
    <div className={`friends2 section-block`}>
      <div className="header">
        <h2>Alex's Friends: </h2>
      </div>
      <div
        className={`list-wrapper ${style}`}
        onMouseEnter={onHover}
        onMouseLeave={() => setStyle("")}
      >
        <div className="back" onClick={onBack}>
          <i className="fa fa-caret-up"></i>
        </div>
        <div className="forward" onClick={onForward}>
          <i className="fa fa-caret-down"></i>
        </div>
        <div className="list">
          <div className="list-flex-container" ref={list}>
            <div
              className="pic"
              style={{ backgroundImage: "url('src/resources/img/girl2.jpg')" }}
            >
              <div className="shadow"></div>
            </div>

            <div
              className="pic"
              style={{ backgroundImage: "url('src/resources/img/girl2.jpg')" }}
            >
              <div className="name">pidor</div>
              <div className="shadow"></div>
            </div>
          </div>
        </div>
      </div>
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
