import { createAuthor, getAuthors } from "../../services";
import { saveAuthor, setAuthors } from "../slices/authorsSlice";

export const createAuthorThunk = (newAuthor, token) => {
  return async (dispatch) => {
    const author = await createAuthor(newAuthor, token);
    dispatch(saveAuthor(author));
  };
};

export const getAuthorsThunk = () => {
  return async (dispatch) => {
    const authors = await getAuthors();
    dispatch(setAuthors(authors));
  };
};
