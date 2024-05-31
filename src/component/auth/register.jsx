import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

function Register() {
  const [state, setState] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    role: "",
  });

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { name, phone, email, role, password } = state;
      const { data } = await axios.post(
        "http://localhost:4000/api-v2/user/register",
        { name, phone, email, role, password },
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
      console.error(error);
      toast.error("Something is wrong");
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select name="role" value={state.role} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Zeeshan"
                  value={state.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="zk@gmail.com"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  name="phone"
                  placeholder="12345678"
                  value={state.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit">Register</button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="login" />
        </div>
      </section>
    </div>
  );
}

export default Register;
