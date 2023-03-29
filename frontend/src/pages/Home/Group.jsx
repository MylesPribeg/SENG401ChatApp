import React, { useEffect } from "react";
import avater from "../../assets/avater.svg";
import "./Group.css";

export default function Group(props) {
  // useEffect(()=>{
  //   console.log("changed")

  // },[props.currentGroup])
  
  
  return (
    <div className={`group ${props.val.active?"active":""}`} onClick={props.clickHandler} >
      <img src={avater} alt="" />
      <h2 className="group-name font">{props.val.name}</h2>
    </div> 
  );
}
