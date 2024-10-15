import  { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";



export default function Register() {
  let navigate = useNavigate();
  const [errorsList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataInfo, setDataInfo] = useState({
    name: "",
    email: "",
    password: "", 
    confirmPassword: "",
  });

  function getData(e) {
    let objectToSend = { ...dataInfo };
    objectToSend[e.target.name] = e.target.value;
    setDataInfo(objectToSend);
  }

  async function handleRegister(e) {
    setLoading(true);
    e.preventDefault();
    let validateResult = validateRegisterForm(); 
    setErrorList(validateResult?.error?.details);
    
    if (validateResult?.error?.details?.length > 0) {
      console.log(validateResult?.error?.details);
      setLoading(false); 
    } else {
      try {
        const res = await axios.post("http://localhost:4000/api/auth/signup", {
          name: dataInfo.name,   
          email: dataInfo.email,
          password: dataInfo.password,
        });
        if (res.status === 200) { 
          console.log("Registration successful", res);
          setErrorMessage(res.data.msg);
          navigate("/login");
        }
      } catch (err) {
        if (err?.response) {
          console.error("Registration error response:", err.response.data); 
          if (err.response.status === 400) {
            setErrorMessage(err.response.data.msg);
          } else if (err.response.status === 500) {
            setErrorMessage("An error occurred during registration. Please try again later.");
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
      name: Joi.string().alphanum().min(3).max(30).required(), 
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),  
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),  
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords must match',  
      }),
    });
    return schema.validate(dataInfo, { abortEarly: false });  
  }

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <h2>Create an Account</h2>

        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label>Name :</label>
            <input
              type="text"
              name="name"  
              value={dataInfo.name}  
              onChange={getData}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={dataInfo.email}  
              onChange={getData}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password :</label>
            <input
              type="password"
              name="password"
              value={dataInfo.password}  
              onChange={getData}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Confirm Password :</label>
            <input
              type="password"
              name="confirmPassword"
              value={dataInfo.confirmPassword}  
              onChange={getData}
              required
            />
          </div>
          <button type="submit">{loading ? <i className="fas fa-spin fa-spinner"></i> : "Sign Up"}</button>
          <p className={styles.footerText}>
            Already have an account? <a href="/login">Sign In</a>
          </p>
          {errorsList?.map((err, index) => (
          <h3 key={index} className="alert alert-danger">{err.msg}</h3>  
        ))}

         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
