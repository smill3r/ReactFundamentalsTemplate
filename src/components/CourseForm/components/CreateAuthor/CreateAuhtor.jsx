import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input, Button } from "../../../../common";

export const CreateAuthor = ({ onCreateAuthor }) => {
  // write your code here
  const [author, setAuthor] = useState();
  return (
    <div className={styles.newAuthorContainer}>
      <Input
        data-testid="createAuthorInput"
        labelText="Author Name"
        placeholderText="Please input author name"
        onChange={(e) => setAuthor(e.target.value)}
      ></Input>
      <Button
        buttonText="CREATE AUTHOR"
        data-testid="createAuthorButton"
        handleClick={() => onCreateAuthor(author)}
      ></Button>
    </div>
  );
};
