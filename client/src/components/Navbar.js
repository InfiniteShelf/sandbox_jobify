import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "./../assets/wrappers/Navbar";
import Logo from "./Logo";

const Navbar = () => {
  const [showLogout, setShowLogout]         = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();
  
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={ toggleSidebar }>
          <FaAlignLeft/>
        </button>
        
        <div>
          <Logo/>
          <h3 className="logo-text">Dashboard</h3>
        </div>
        
        <div className="btn-container">
          <button type="button" className="btn" onClick={ () => setShowLogout(!showLogout) }>
            <FaUserCircle/>
            { user?.name }
            <FaCaretDown/>
          </button>
          
          <div className={ `dropdown ${ showLogout ? "show-dropdown" : "" }` }>
            <button type="button" className="dropdown-btn" onClick={ () => logoutUser() }>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;