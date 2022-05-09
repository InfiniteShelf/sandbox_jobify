import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "./../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  
  return (
    <Wrapper>
      <div className={ `sidebar-container ${ showSidebar ? "show-sidebar" : "" }` }>
        <div className="content">
          <button type="button" className="close-btn" onClick={ () => console.log("toggle sidebar") }>
            <FaTimes/>
          </button>
          
          <header>
            <Logo/>
          </header>
          
          <NavLinks toggleSidebar={ toggleSidebar }/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;