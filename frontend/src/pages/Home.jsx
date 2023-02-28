import React from "react";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";
import "../Home.css";


export default function Home() {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const handleClick = () => {
    logOut();
  };

  return (
    <div class="parent">
    <div class="top">
        <div class="group-container">
            <h1>gROUPS GO HERE</h1>
        </div>
    </div>
    <div class="main">
        <div class="chats">
        <h1>chats GO HERE</h1>
        </div>
        <div class="message-area">
        <h1>msgs GO HERE</h1>
        <h1>msgs GO HERE</h1>
        </div>
    </div>
    <div class="bot">
    <h1>Footer</h1>
    </div>
</div>
  );
}
