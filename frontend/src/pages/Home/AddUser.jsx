import { useState } from "react";
import close from "../../assets/close.svg";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function AddUser(props) {
  const [usernameInput, setUsernameInput] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = "http://localhost:8000/groups/"; // Assuming your server is running on port 8000
      const response = await axios.put(
        `${API_URL}/add/${props.groupid._id}?username=${usernameInput}`
      );
      console.log(response.data);

      setUsernameInput("");
      props.state(false);
    } catch (error) {
      console.error(
        "Error adding user to group:",
        error.response?.data || error
      );
    }
  };
  const handleCloseClick = () => {
    setUsernameInput("");
    props.state(false);
  };

  return (
    <div className="addGroupParent">
      <div className="closeIcon">
        <img
          className="settings-svg"
          onClick={handleCloseClick}
          src={close}
          alt=""
        />
      </div>

      <div className="addGroupContainer">
        <h3> Please Enter a Username</h3>

        <input
          type="text"
          placeholder="Type a message"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <button type="submit" onClick={handleMessageSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}
