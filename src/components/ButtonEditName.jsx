import { useSelector } from "react-redux";
import { store, setUserInfo } from "../redux/store";
import { useState } from "react";

import { EditForm } from "./EditForm";

import "../styles/main.css";

/**
 * Edit Name
 * @returns 
 */
export function ButtonEditName() {

  const user = useSelector((state) => state.userInfo);
  const token = useSelector((state) => state.token);
  const [clicEditButton, setClicEditButton] = useState(false);

  //Send request if user data is empty
  if(!user.firstName){
    const url = "http://localhost:3001/api/v1/user/profile";
         
    // Send POST request:
    fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(function(res) {
        return res.json()
        .then(function(value) {
          //Send user data to state
          store.dispatch(setUserInfo(value.body));

        })
        .catch(function(err) {
          console.log(err)
        });
        
      })
  }

  const handleClick = () => {
    // passing it to true displays the name and edit button
    setClicEditButton(true); 
  }

    return (
     <div>
       {!clicEditButton ? (
        <div className="header">
          <h1>Welcome back<br />{user.firstName} {user.lastName}</h1>
          <button className="edit-button" onClick={handleClick}>Edit Name</button>
        </div> 
       ) : ( 
        <EditForm/>
       )}
     </div>
    );
}
