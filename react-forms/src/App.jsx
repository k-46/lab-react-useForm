import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [field, setField] = useState();
  const [submit, setSubmit] = useState(false);
  const [visible, setVisible] = useState(false);

  const onSubmit = (data) => {
    setField(data);
    setSubmit(true);
  };

  return (
    <div className="App">
  
      <h1 style={{ color: "white" }}>React Forms Library</h1>

      <div className="content">
  
        <form onSubmit={handleSubmit(onSubmit)}>
  
          {submit ? (
            <div className="reg-success">
              <h2>Registration Successful</h2>
            </div>
          ) : null}

          <input
            type="text"
            placeholder="firstName"
            {...register("firstName", { required: "First name is Required" })}
          />

          <span className="err-msg">{errors.firstName?.message}</span>

          <input
            type="text"
            placeholder="lastName"
            {...register("lastName", { required: "Last name is Required" })}
          />

          <span className="err-msg">{errors.lastName?.message}</span>

          <input
            type="text"
            placeholder="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,14}$/i,
                message: "Invalid email",
              },
            })}
          />

          <span className="err-msg">{errors.email?.message}</span>

          <div className="pwd-block">
            
            <input
              type={visible ? "text" : "password"}
              placeholder="password"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters ",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be less than 20 characters ",
                },
              })}
            />

            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: visible ? "#7c6a96" : "#EF3837",
              }}
              onClick={() => setVisible(!visible)}
            >
              Click to {visible ? "hide" : "display"}
            </span>
          
          </div>

          <span className="err-msg">{errors.password?.message}</span>

          <button>Register</button>
        
        </form>

      </div>

      {submit && isValid ? (
        <div style={{ color: "white" }}>
      
          <h2>Username: {field.firstName + " " + field.lastName}</h2>
      
          <h2>Email: {field.email}</h2>
      
        </div>
      ) : null}
      
    </div>
  );
}

export default App;
