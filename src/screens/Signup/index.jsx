import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/images/logo.png";
import loadingGif from "../../assets/images/loading.gif";
import { userRegister, userInfo } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Signup = () => {
  const history = useHistory();

  const emptyObj = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupObj, setSignupObj] = useState(emptyObj);
  const { userName, email, password, confirmPassword } = signupObj;

  const signupForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword) {
      try {
        const user = await userRegister(email, password);
        const uid = user.user.uid;
        await userInfo({
          userName,
          email,
          userId: uid,
          status: "i'm new here",
        });
        swal("Congratulations!", "Account created successfully!", "success");
        setSignupObj(emptyObj);
        history.push("/");
      } catch (error) {
        swal("Error!", `${error.message}`, "error");
      }
    } else {
      swal("Error!", "Password doesn't match!", "error");
    }
    setLoading(false);
  };

  const inputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupObj({ ...signupObj, [name]: value });
  };

  return (
    <div className="signup_container">
      <div className="signup_container_wrap">
        <div className="signup_right_side">
          <div className="logo">
            <img src={logo} alt="logo" title="logo" />
          </div>
          <div className="logo_content">
            <h2>You and Your Friends Always Connected.</h2>
          </div>
        </div>
        <div className="signup_form_container">
          <form onSubmit={signupForm}>
            <div className="signup_heading">
              <h2>Signup</h2>
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="input_fields">
              <p>User name</p>
              <input
                onChange={inputValue}
                type="text"
                name="userName"
                autoComplete="off"
                value={userName}
                required
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="input_fields">
              <p>Email address</p>
              <input
                onChange={inputValue}
                type="email"
                name="email"
                autoComplete="off"
                value={email}
                required
              />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="input_fields">
              <p>
                Password
                <span className="character_span">(must be 6 characters)</span>
              </p>
              <input
                onChange={inputValue}
                type={!showPassword ? "password" : "text"}
                name="password"
                autoComplete="off"
                value={password}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
            <div className="input_fields">
              <p>Confirm Password</p>
              <input
                onChange={inputValue}
                type={!showPassword ? "password" : "text"}
                name="confirmPassword"
                autoComplete="off"
                value={confirmPassword}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
            <div className="show_password">
              <input
                onClick={() => setShowPassword(!showPassword)}
                type="checkbox"
                name="showPassword"
              />
              <span>show password</span>
            </div>
            <div className="signup_button">
              {!loading ? (
                <button type="submit">Signup</button>
              ) : (
                <button>
                  <img className="loading" src={loadingGif} alt="Loading..." />
                  <span className="please_wait">Please wait....</span>
                </button>
              )}
            </div>
            <div className="is_account">
              <p onClick={() => history.push("/")}>
                Already have an account? <b>Login</b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
