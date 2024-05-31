import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link,Navigate } from "react-router-dom";
function Register() {
  const[state, setState] = useState({
    email: "",
    password: "",

    role: "",
  });
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin  = async (e) => {
    e.preventDefault();
    try {
      const {  email, role, password } = state; // Destructuring state
      const { data } = await axios.post(
        "http://localhost:4000/api-v2/user/login",
        {  email, role, password }, // Passing destructured state
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong");
    }
  };
  
  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  const handelChange = (_event) => {
		setState((_prevState) => ({
			..._prevState,
			[_event.target.name]: _event.target.value,
			// [`${_event.target.name}Err`]: false,
			// [`${_event.target.name}ErrMsg`]: '',
		}));
	};
  console.log(state)

  return (
    <>
    <section className="authPage">
      <div className="container">
        <div className="header">
          {/* <img src="/JobZeelogo.png" alt="logo" /> */}
          <h3>Login to your account</h3>
        </div>
        <form>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select name="role" value={state.role} onChange={handelChange}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              {/* <FaRegUser /> */}
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
              name="email"
                type="email"
                placeholder="zk@gmail.com"
                value={state.email}
                onChange={handelChange}
              />
              {/* <MdOutlineMailOutline /> */}
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
              name="password"
                type="password"
                placeholder="Your Password"
                value={state.password}
                onChange={handelChange}
              />
              {/* <RiLock2Fill /> */}
            </div>
          </div>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>
      <div className="banner">
        {/* <img src="/login.png" alt="login" /> */}
      </div>
    </section>
  </>
  )
}

export default Register;
