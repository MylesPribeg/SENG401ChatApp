import React from "react";
import avater from "../assets/avater.svg";
import "../Group.css";

export default function Group() {
  return (
    <div className="group">
      <img src={avater} alt="" />
      <h2 className="group-name">Group X</h2>
    </div>
  );
}
