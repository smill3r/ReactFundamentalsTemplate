// Module 1.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#create-input-component

import React from "react";

import styles from "./styles.module.css";

export const Input = ({
  placeholderText,
  labelText,
  onChange,
  error,
  "data-testid": dataTestId,
  type,
  customError,
}) => (
  <>
    <label className={styles.label}>{labelText}</label>
    <input
      onChange={onChange}
      placeholder={placeholderText}
      className={styles.input}
      data-testid={dataTestId}
      type={type}
      style={{
        border: error ? "1px solid red" : "1px solid #cfcfcfad",
        marginBottom: error ? 0 : 20,
      }}
    />
    {error ? (
      customError ? (
        <label className={styles.error}>{customError}</label>
      ) : (
        <label className={styles.error}>{`${labelText} is required`}</label>
      )
    ) : null}
  </>
);
