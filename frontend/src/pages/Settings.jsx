import React from "react";
import close from "../assets/close-svg.svg";
import { useState } from "react";

export default function Settings(props) {
  const [trigger, setTrigger] = useState(true);

  const handleClose = () => {
    setTrigger(false);
  };

  const element = (
    <div className="pop-up">
      <div className="inner">
        <img
          onClick={handleClose}
          className="close-img"
          src={close}
          alt="close"
        />
        <h1>Settings</h1>
        {props.children}
      </div>
    </div>
  );

  return trigger ? element : "";
}
