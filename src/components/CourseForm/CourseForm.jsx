// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * add functionality to create new course with:
// //   ** title
// //   ** description
// //   ** duration (user enters in minutes, you should map in format «hh:mm»)
// //   ** existing authors (use 'authorsList' prop)
// //   ** new created author (create field and button, update 'authorsList')
// //   ** user should be able to remove author from the course
// //   ** add validation to the fields
// //   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// // ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#add-new-course

// // Module 3.
// // * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// // * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// // ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#add-new-course

// // Module 4.
// // * render this component only for ADMIN user
// // * in this module you should separate functionality for this component:
// //   ** create mode:
// //     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
// //     * make a request to save new course
// //     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// //     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
// //     * save new course to the store after success response
// // ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#add-new-course
// //   ** update mode:
// //     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
// //     * appropriate forms field should be prefilled with course's info
// //     * user should have ability to modify course information in the fields and change authors list
// //     * make a request to save updated course
// //     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// //     save updated course to the store after success response.
// // ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#update-course

// // Module 5:
// // * proposed cases for unit tests:
// //   ** CourseForm should show authors lists (all and course authors).
// //   **  CourseForm 'Create author' button click should call dispatch.
// //   **  CourseForm 'Add author' button click should add an author to the course authors list.
// //   **  CourseForm 'Delete author' button click should delete an author from the course list.

// import React from "react";

import styles from "./styles.module.css";
import { Input, Button } from "../../common";
import { useState } from "react";
import { getCourseDuration } from "../../helpers";
import { AuthorItem, CreateAuthor } from "./components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveCourse } from "../../store/slices/coursesSlice";
import { saveAuthor } from "../../store/slices/authorsSlice";
import { getAuthorsSelector } from "../../store/selectors";

export const CourseForm = () => {
  //write your code here
  const dispatch = useDispatch();
  const authorsList = useSelector(getAuthorsSelector);
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [valid, setValid] = useState({
    title: true,
    description: true,
    duration: true,
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const navigate = useNavigate();

  const getId = () => {
    return window.crypto.getRandomValues(new Uint8Array(10)).join("");
  };

  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };

  const createNewCourse = () => {
    const validObj = validate();

    if (validObj.description && validObj.title && validObj.duration) {
      const newCourse = {
        ...formData,
        authors: courseAuthors.map((author) => author.id),
        id: getId(),
        creationDate: getToday(),
      };
      dispatch(saveCourse(newCourse));
      navigate("/courses");
    }
  };

  const validate = () => {
    const validObj = {
      title: formData.title.length > 1,
      description: formData.description.length > 1,
      duration: formData.duration > 0,
    };

    setValid(validObj);

    return validObj;
  };

  const createNewAuthor = (authorName) => {
    const author = {
      name: authorName,
      id: getId(),
    };

    dispatch(saveAuthor(author));
  };

  const removeCourseAuthor = (author) => {
    setCourseAuthors(
      courseAuthors.filter((courseAuthor) => courseAuthor.id !== author.id)
    );
  };

  const addCourseAuthor = (author) => {
    if (!courseAuthors.map((a) => a.id).includes(author.id)) {
      setCourseAuthors([...courseAuthors, author]);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Course edit/Create page</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          data-testid="titleInput"
          labelText="Title"
          placeholderText={"Please input title"}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={!valid.title}
          customError="Title should be have at least two letters"
        ></Input>

        <label>
          Description
          <textarea
            className={styles.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            data-testid="descriptionTextArea"
            style={{
              border: !valid.duration ? "1px solid red" : "1px solid #cfcfcfad",
            }}
          />
        </label>

        {!valid.description && (
          <span style={{ color: "red" }}>
            Description should have at least two letters
          </span>
        )}

        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              <Input
                labelText="Duration"
                data-testid="durationInput"
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                type="number"
                error={!valid.duration}
                customError="Duration should be at least 1 minute"
              ></Input>
              <p>{getCourseDuration(formData.duration)}</p>
            </div>
            <h2>Authors</h2>
            <CreateAuthor
              onCreateAuthor={(author) => createNewAuthor(author)}
              data-testid="addAuthor"
            ></CreateAuthor>
            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>
              {authorsList.map((author) => (
                <AuthorItem
                  key={author.id}
                  author={author}
                  addAuthor={(newAuthor) => addCourseAuthor(newAuthor)}
                />
              ))}
            </div>
          </div>

          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>
            {courseAuthors.map((author) => (
              <AuthorItem
                key={author.id}
                author={author}
                removeAuthor={(author) => removeCourseAuthor(author)}
              />
            ))}
            {courseAuthors.length ? null : (
              <p className={styles.notification}>List is empty</p>
            )}
          </div>
        </div>
      </form>

      <div className={styles.buttonsContainer}>
        <Button
          buttonText="CANCEL"
          handleClick={() => navigate("/courses")}
        ></Button>
        <Button
          buttonText="CREATE COURSE"
          data-testid="createCourseButton"
          handleClick={createNewCourse}
        ></Button>
      </div>
    </div>
  );
};
