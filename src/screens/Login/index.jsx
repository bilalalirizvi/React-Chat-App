import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { useHistory } from "react-router-dom";
import { userLogin, userOnline } from "../../config/firebase";
import loadingGif from "../../assets/images/loading.gif";
import swal from "sweetalert";
// import { useDispatch } from "react-redux";
// import { storeUser } from "../../store/actions";

const Login = () => {
  const history = useHistory();
  // const dispatch = useDispatch();

  const emptyObj = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginObj, setLoginObj] = useState(emptyObj);
  const { email, password } = loginObj;
  // const [userLogged, setUserLogged] = useState(false)

  const loginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await userLogin(email, password);
      // dispatch(storeUser(user));
      // console.log(user.user.uid);
      userOnline(true, user.user.uid);
      swal("Welcome Back!", "Account Login successfully!", "success");
      setLoginObj(emptyObj);
      history.push("/dashboard");
    } catch (error) {
      swal("Error!", `${error.message}`, "error");
    }
    setLoading(false);
  };

  const inputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginObj({ ...loginObj, [name]: value });
  };

  return (
    <div className="login_container">
      <div className="login_container_wrap">
        <div className="login_right_side">
          <div className="logo">
            <img src={logo} alt="logo" title="logo" />
          </div>
          <div className="logo_content">
            <h2>
              Remember to get up & stretch once in a while - your friends at
              chat.
            </h2>
          </div>
        </div>
        <div className="login_form_container">
          <form onSubmit={loginForm}>
            <div className="login_heading">
              <h2>Login</h2>
              <i className="fas fa-sign-in-alt"></i>
            </div>
            <div className="input_fields">
              <p>Email address</p>
              <input
                onChange={inputValue}
                type="email"
                value={email}
                name="email"
                required
                autoComplete="off"
              />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="input_fields">
              <p>Password</p>
              <input
                onChange={inputValue}
                type={!showPassword ? "password" : "text"}
                value={password}
                name="password"
                required
                autoComplete="off"
              />
              <i className="fas fa-lock"></i>
            </div>
            <div className="show_password">
              <input
                onClick={() => setShowPassword(!showPassword)}
                type="checkbox"
              />{" "}
              <span>show password</span>
            </div>
            <div className="login_button">
              {!loading ? (
                <button type="submit">Login</button>
              ) : (
                <button>
                  <img className="loading" src={loadingGif} alt="Loading..." />
                  <span className="please_wait">Please wait....</span>
                </button>
              )}
            </div>
            <div className="is_account">
              <p onClick={() => history.push("/signup")}>
                Don't have an account? <b>SignUp</b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
