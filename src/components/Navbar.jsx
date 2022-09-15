import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { store, removeStorage, emptyState } from "../redux/store";

import "../styles/main.css"

import Logo from "../assets/argentBankLogo.png";

/**
 * Navbar
 * @returns 
 */
export function Navbar() {
  
  const userFirstName = useSelector((state) => state.userInfo.firstName);
  const token = useSelector((state) => state.token);

  const handleClick = () => {
    store.dispatch(emptyState('emptyState'));
    store.dispatch(removeStorage('removeStorage'));
  }

  return (
    <div>
        <nav className="main-nav">
          <Link to="/" className="main-nav-logo">
            <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo"/>
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          {token ? (
            <div className="username">
              <FaUserCircle className="fausercircle"/><p><i className="fa-solid fa-user"></i>{userFirstName}</p>
              <Link to="/" onClick={handleClick}><FiLogOut className="fausercircle"/>Logout</Link>
            </div>
          ) : (
            <Link to="/login"><FaUserCircle className="fausercircle"/>Sign In</Link>
          )}
        </nav>
      
    </div>
  );
}
