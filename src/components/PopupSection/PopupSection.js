import React from "react";
import { compose } from "../../utils";
import withService from "../hoc/withService";
import { connect } from "react-redux";
import { avatarUpload } from "../../actions";
import "./PopupSection.sass";

const PopupSection = ({ render, ...args }) => {
  return <div className="popup">{render(args)}</div>;
};

const mapStateToProps = ({ photo: { fileEncode, base64, width, height } }) => ({
  fileEncode,
  base64,
  width,
  height
});

const mapDispatchToProps = (dispatch, { service }) => ({
  onUploadConfirm: () => dispatch(avatarUpload(service)),
  onUploadCancel: () => dispatch("CLOSE_POPUP")
});

export default compose(
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(PopupSection);
