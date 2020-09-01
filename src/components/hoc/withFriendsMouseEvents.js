import React, { useRef, useState } from "react";

const withFriendsMouseEvents = Wrapped => props => {
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
    <Wrapped
      {...props}
      list={list}
      style={style}
      onHover={onHover}
      onBack={onBack}
      onForward={onForward}
      setStyle={setStyle}
    />
  );
};

export default withFriendsMouseEvents;
