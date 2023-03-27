import { useState } from "react"
import close from "../../assets/close.svg"
export default function AddGroup(props){

    const [group, setGroup] = useState("")
    const handleMessageSubmit = (e)=>{
        e.preventDefault();
        props.setGroup(false)
    }
    const handleCloseClick = () =>{

        setGroup("")
        props.state(false)

    }
    return(
        <div className="addUserParent">
            
            <div className="closeIcon">
            <img
            onClick={handleCloseClick}
            src={close}
            alt=""
          />
            </div>

            <div className="addUserContainer">
            <h3> Please Enter Group Name</h3>
                
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