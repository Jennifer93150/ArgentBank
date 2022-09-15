import { store, setUserInfo } from "../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";

import { ButtonEditName } from "./ButtonEditName";

import "../styles/main.css";

/**
 * Change username form
 * @returns 
 */
export function EditForm() {

  const token = useSelector((state) => state.token);
  const firstname = useSelector((state) => state.userInfo.firstName);
  const lastname = useSelector((state) => state.userInfo.lastName);
  const [clicSaveButton, setClicSaveButton] = useState(false);
  const url = "http://localhost:3001/api/v1/user/profile";

  const handleSubmit = (event)=>{
    event.preventDefault();
    // Send PUT request:
    fetch(url, {
      method: 'PUT',
      headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
      //if empty value retrieve old value
      firstName: !event.target.firstname.value ? firstname : event.target.firstname.value,
      lastName: !event.target.lastname.value ? lastname : event.target.lastname.value
      }),

    })
    .then(function(res) {
        return res.json()
    .then(function(value) {
        store.dispatch(setUserInfo(value.body));
        setClicSaveButton(true);
    })
    .catch(function(err) {
        console.log(err)
    });
    })
  }

  const handleReset = (event) => {
    event.preventDefault();
    //by passing to true edit button we go back
    setClicSaveButton(true);
  }
  
  return (
    <div>
      {/* if click on edit button displays the form */}
       {clicSaveButton ? (
        <ButtonEditName />
       ) : ( // otherwise displays the name and edit button
        <div className="header">
          <h1>Welcome back</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="wrapper-edit">
                    <label htmlFor="firstname"></label>
                    <input className="input-wrapper-edit" type="text" name="firstname" placeholder={firstname}/>
                    <label htmlFor="lastname"></label>
                    <input className="input-wrapper-edit" type="text" name="lastname" placeholder={lastname}/>
                </div>
                <div className="wrapper-edit-button">
                    <input type="submit" className="edit-button-save" value="Save"/>
                    <input type="reset" className="edit-button-cancel" value="Cancel"/>
                </div>
            </form>
        </div>
       )}
     </div>
  )
}

