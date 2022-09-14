import "../styles/main.css";

import { Navbar } from "../components/Navbar";
import { SignIn } from "../components/SignIn";
import { Footer } from "../components/Footer";

/**
 * Login page
 * @returns 
 */
export function Login() {
  
  return (
    <div>
        <Navbar/>
        <SignIn/>
        <Footer/>
    </div>
    
  );
}




