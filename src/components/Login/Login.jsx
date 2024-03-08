// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// // * render this component by route '/login'
// // * use login service to submit form data and make POST API request '/login'.
// // * component should have a link to the Registration page (see design)
// // * save token from API after success login to localStorage.
// // ** PAY ATTATION ** token should be saved to localStorage inside login handler function after login service responce
// // ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#login-new-component

// // Module 3.
// // * save user's name, token and email to the store after success login.
// // ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#login-component

// import React from "react";

import { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../common";

export const Login = () => {
  // write your code here
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(false);
  const [responseError, setResponseError] = useState();
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (result.successful) {
        localStorage.setItem("token", result.result);
        localStorage.setItem("userName", result?.user?.name);
        navigate("/courses", { replace: true });
      } else {
        setResponseError(result.errors);
      }
    } else {
      setFormError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={(e) => onLogin(e)}>
          <Input
            placeholderText="Input email"
            labelText="Email"
            error={formError}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></Input>
          <Input
            placeholderText="Input password"
            labelText="Password"
            error={formError}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></Input>
          <Button buttonText="LOGIN"></Button>
        </form>
        <p>
          If you don't have an account you may&nbsp;{" "}
          <Link to={"/registration"}>Register</Link>
        </p>

        {responseError ? <p style={{ color: "red" }}>{responseError}</p> : null}
      </div>
    </div>
  );
};
