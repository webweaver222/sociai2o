import React, { useRef } from "react";
import { connect } from "react-redux";

import pic from "../../resources/img/girl3.png";
import ProgressBar from "../minorComp/LoadingProgress";
import { avatarEncode } from "../../actions";
import "./Photo.sass";

const Photo = ({ data, onAvatarUpl }) => {
  const fileInput = useRef(null);

  const avatarConfirm = ({
    fileEncode,
    base64,
    width,
    height,
    onUploadConfirm,
    onUploadCancel
  }) => {
    const img = base64 ? (
      <img src={base64} alt="" width={width * 0.5} height={height * 0.5} />
    ) : null;

    const content = fileEncode ? (
      <ProgressBar />
    ) : (
      <React.Fragment>
        {img}
        <div className="btns">
          <button onClick={onUploadConfirm}>Confirm</button>
          <button onClick={onUploadCancel}>Cancel</button>
        </div>
      </React.Fragment>
    );

    return <div className="avatarPopup">{content}</div>;
  };

  const onAvatarChange = () => {
    onAvatarUpl(avatarConfirm)(fileInput.current.files[0]);
  };

  return (
    <div className="photo section-block">
      <h2>{data.username}</h2>
      <img src={data.avatarUrl} height={"90%"} width={"90%"} alt="photo" />
      <input type="file" ref={fileInput} onChange={onAvatarChange} />
      <button onClick={() => fileInput.current.click()}>Change Picture</button>
    </div>
  );
};

const mapStateToProps = ({ profile: { data } }) => ({
  data
});

const mapDispatchToProps = dispatch => ({
  onAvatarUpl: func => file => dispatch(avatarEncode(func)(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
