import { useState } from "react"
import close from "../../assets/close.svg"
export default function AddUser(props){

    const [group, setGroup] = useState("")
    const handleMessageSubmit = (e)=>{
        e.preventDefault();
        // props.setGroup(false)
    }
    const handleCloseClick = () =>{

        setGroup("")
        props.state(false)

    }
    return(
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
                value={group}
                onChange={(e) => setGroup(e.target.value)}
            />
            <button type="submit" onClick={handleMessageSubmit}>Send</button>
            </div>

            



        </div>
    )
}