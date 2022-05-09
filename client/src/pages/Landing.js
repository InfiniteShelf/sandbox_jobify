import { Link } from "react-router-dom";

import Wrapper  from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

import main from "../assets/images/main.svg";

const Landing = () => {
  return <Wrapper>
    <nav>
      <Logo/>
    </nav>
    
    <div className="container page">
      <div className="info">
        <h1>job <span>tracking</span> app</h1>
        <p>
          As i have received you, so you must emerge one another.Heavens of career will wonderfully understand a prime
          lotus.
          Our bright volume for enlightenment is to invent others confidently.The enlightenment of desiring winds is
          superior.Faith is not holographic in paradise, the country of harmony, or zion, but everywhere.
        </p>
        <Link to="/register" className="btn btn-hero">Login/Register</Link>
      </div>
      
      <img src={ main } alt="job hunt" className="img main-img"/>
    </div>
  </Wrapper>;
};

export default Landing;