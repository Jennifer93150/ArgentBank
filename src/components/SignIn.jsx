import { useSelector } from "react-redux";
import { store, setToken } from "../redux/store";
import { Navigate } from "react-router-dom";

import { FaUserCircle } from 'react-icons/fa';

/**
 * Login form
 * @returns
 */
export function SignIn() {

  const token = useSelector((state) => state.token);

  const handleSubmit = (event) =>{
    event.preventDefault();
    
    const url = "http://localhost:3001/api/v1/user/login";

    // Send POST request:
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: event.target.username.value,
        password: event.target.password.value
      }),
      headers: {
        "Content-Type": "application/json",
      },

    })
      .then(function(res) {
        return res.json()
        .then(function(value) {
          store.dispatch(setToken(value.body.token));
        })
        .catch(function(err) {
          console.log(err)
        });
      })
  }

  return (
    <div>
      {token ? (
        <Navigate to="/user" replace={true}/>
      ) : (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FaUserCircle className="sign-in-icon"/>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="email"/>
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"/>
                  </div>
                  <div className="input-remember">
                    <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                  </div>
                  <input type="submit" className="sign-in-button" value="Sign In"/>
                
                </form>
            </section>
        </main>
      )}
    </div>
       
  );
}
