// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)
//
// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-219&mode=design&t=0FIG0iRzKcD0s16M-0
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-257&mode=design&t=0FIG0iRzKcD0s16M-0
// // * render this component by route '/registration'
// // * submit form data and make POST API request '/registration'.
// // * after successful registration navigates to '/login' route.
// // * component should have a link to the Login page (see design)
// // ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#registration-new-component
//
// import React from "react";

import styles from "./styles.module.css";
import { Input, Button } from "../../common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services";

export const Registration = () => {
  // write your code here
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState({
    name: true,
    email: true,
    password: true,
  });

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((p) => p === "")) {
      setIsValid({
        name: formData.name.length,
        email: formData.email.length,
        password: formData.password.length,
      });
    } else {
      const result = await createUser(formData);

      if (result.successful) {
        navigate("/login", { replace: true });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={(e) => register(e)}>
          <Input
            placeholderText="Input name"
            labelText="Name"
            error={!isValid.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          ></Input>
          <Input
            placeholderText="Input email"
            labelText="Email"
            error={!isValid.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></Input>
          <Input
            placeholderText="Input password"
            labelText="Password"
            error={!isValid.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></Input>
          <Button buttonText="REGISTER"></Button>
        </form>
        <p>
          If you have an account you may&nbsp; <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
