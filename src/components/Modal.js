/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import PropTypes from "prop-types";

class Modal extends React.Component {
  render() {
    if (!this.props.isOpen) {
      return null;
    }

    const BackgroundStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex:100,
      height: "100%",
      width: "100%",
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    };

   let  ModalStyle
  if (this.props.preview===true){
    ModalStyle = {
      maxWidth: 900,
      maxHeight:800,
      backgroundColor: "#fff",
      margin: "auto",
      padding: 5,
      overflow:"scroll"
    };
  }else{
   ModalStyle = {
      maxWidth: 500,
      minHeight: 200,
      backgroundColor: "#fff",
      margin: "auto",
      padding: 5
    };


  }

   
    const HeaderStyle = {
      height: 20,
      width: "100%"
    };

    const CloseBtnStyle = {
      float: "right",
      cursor: "pointer",
      display: "block"
    };

    return (
      <div style={BackgroundStyle} >
        <div style={ModalStyle}>
          <div style={HeaderStyle}>
            <span style={CloseBtnStyle} onClick={this.props.onClose}>
              X
            </span>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
