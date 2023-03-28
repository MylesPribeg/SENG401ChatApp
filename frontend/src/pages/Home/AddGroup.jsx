import { useEffect, useState } from "react";
import axios from "axios";
import close from "../../assets/close.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function AddGroup(props) {
  const [group, setGroup] = useState("");
  const { user } = useAuthContext();

  function refreshPage() {
    window.location.reload(false);
  }

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

      // Fetch the username of the current user
      const username = user?.username;

      // Make the API call
      const response = await axios.post(`${API_URL}create`, {
        groupName: group,
        username: username,
      });

      console.log(response.data);

      // Close window
      handleCloseClick();
      refreshPage();
    } catch (error) {
      console.error("Error creating group:", error.message);
    }
  };

  const handleCloseClick = () => {
    setGroup("");
    props.state(false);
  };

  return (
    <div className="addUserParent">
      <div className="closeIcon">
        <img onClick={handleCloseClick} src={close} alt="" />
      </div>

      <div className="addUserContainer">
        <h3>Please Enter Group Name</h3>

        <input
          type="text"
          placeholder="Type a message"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <button type="submit" onClick={handleMessageSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}
