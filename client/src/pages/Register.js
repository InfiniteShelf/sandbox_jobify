import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  name:     "",
  email:    "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate            = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
          user,
          isLoading,
          showAlert,
          displayAlert,
          registerUser,
          loginUser,
        }                   = useAppContext();
  
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    
    const { name, email, password, isMember } = values;
    
    if (!email || !password || (!isMember && !name)) {
      displayAlert(); // Call a function that will dispatch an action!
      return;
    }
    
    const currentUser = { name, email, password };
    
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  
  return (
    <Wrapper className="full-page">
      <form onSubmit={ handleSubmit } className="form">
        <Logo/>
        <h3>{ values.isMember ? "Login" : "Register" }</h3>
        { showAlert && <Alert/> }
        
        { !values.isMember && (
          <FormRow
            handleChange={ handleChange }
            type="text"
            value={ values.name }
            name="name"
          />
        ) }
        
        
        <FormRow
          handleChange={ handleChange }
          type="email"
          value={ values.email }
          name="email"
        />
        
        <FormRow
          handleChange={ handleChange }
          type="password"
          value={ values.password }
          name="password"
        />
        
        <button type="submit" className="btn btn-block" disabled={ isLoading }>submit</button>
        <p>
          { values.isMember ? "Not a member yet?" : "Already a member?" }
          <button onClick={ toggleMember } type="button" className="member-btn">
            { values.isMember ? "Register" : "Login" }
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;