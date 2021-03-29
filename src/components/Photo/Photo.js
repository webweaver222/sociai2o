import React, { useRef } from "react";
import { connect } from "react-redux";

import pic from "resources/img/qm.png";
import ProgressBar from "components/minorComp/LoadingProgress";
import { avatarEncode } from "actions/profile";
import "./Photo.sass";

const Photo = ({ data, user, onAvatarUpl, avatarWidth, avatarHeight }) => {
  const fileInput = useRef(null);
  console.log(avatarWidth);
  const avatarConfirm = ({
    fileEncode,
    base64,
    width,
    height,
    onUploadConfirm,
    onUploadCancel,
  }) => {
    const img = base64 ? (
      <img src={base64} alt="" width={width} height={height} />
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
    <div
      className="photo section-block"
      //style={{ width: avatarWidth, height: avatarHeight }}
    >
      <h2>{data.username}</h2>
      <img
        src={data.avatarUrl || pic}
        height={avatarHeight || 250}
        width={avatarWidth || 250}
        alt="photo"
      />
      <input type="file" ref={fileInput} onChange={onAvatarChange} />
      {user.username === data.username ? (
        <button onClick={() => fileInput.current.click()}>
          Change Picture
        </button>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({
  auth: { user },
  profile: { data },
  photo: { avatarWidth, avatarHeight },
}) => ({
  data,
  user,
  avatarWidth,
  avatarHeight,
});

const mapDispatchToProps = (dispatch) => ({
  onAvatarUpl: (func) => (file) => dispatch(avatarEncode(func)(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
