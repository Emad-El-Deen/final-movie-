import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  const [errorsList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataInfo, setDataInfo] = useState({
    email: "",
    password: "",
  });

  function getData(e) {
    let objectToSend = { ...dataInfo };
    objectToSend[e.target.name] = e.target.value;
    setDataInfo(objectToSend);
  }

  async function handleLogin(e) {
    setLoading(true);
    e.preventDefault();
    let validateResult = validateRegisterForm(); 
    setErrorList(validateResult?.error?.details);

    if (validateResult?.error?.details?.length > 0) {
      console.log(validateResult?.error?.details);
      setLoading(false); 
    } else {
      try {
        const res = await axios.post("http://localhost:4000/api/auth/login", {
          email: dataInfo.email,
          password: dataInfo.password,
        });
        if (res.status === 200) { 
          localStorage.setItem("Token",res?.data?.token);
          setErrorMessage(res?.data?.msg);
          console.log(res);
          props.saveUserData();
          navigate("/home");
        }
      } catch (err) {
        if (err?.response) {
          console.error("Login error response:", err.response.data); 
          if (err.response.status === 400) {
            setErrorMessage(err.response.data.msg);
          } else if (err.response.status === 500) {
            setErrorMessage("An error occurred during login. Please try again later.");
          } else {
            setErrorMessage(err.response.data.msg || "Unexpected error.");
          }
        } else {
          setErrorMessage("Connection error to the server.");
        }
      } finally {
        setLoading(false); 
      }
    }
  }

  function validateRegisterForm() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    return schema.validate(dataInfo, { abortEarly: false });
  }

  return (
    <div className={styles.wrapper}> 
      <div className={styles.backgroundImage}></div> 
      <div className={styles.overlay}></div> 
      
      <div className={styles.container}>
        <h2>Sign In to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={dataInfo.email}  
              onChange={getData}  
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={dataInfo.password} 
              onChange={getData}  
              required
            />
          </div>
          <button type="submit">
            {loading ? "Loading..." : "Sign In"}
          </button>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <p className={styles.footerText}>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
