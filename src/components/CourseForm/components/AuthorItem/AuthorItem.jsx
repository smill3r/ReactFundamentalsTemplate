import React from "react";

import styles from "./styles.module.css";
import { Button } from "../../../../common";

export const AuthorItem = ({ author, addAuthor, removeAuthor }) => {
  return (
    <div className={styles.authorItem} data-testid="authorItem">
      <span>{author.name}</span>
      {addAuthor ? (
        <Button buttonText="+" handleClick={() => addAuthor(author)}></Button>
      ) : (
        <Button
          buttonText="-"
          handleClick={() => removeAuthor(author)}
        ></Button>
      )}
    </div>
  );
};
