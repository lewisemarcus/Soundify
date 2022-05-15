import React from "react";

const Button = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
      <span />
    </button>
  );
};

export default Button;
