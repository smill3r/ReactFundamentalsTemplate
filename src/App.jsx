import { useEffect } from "react";
import {
  Header,
  Courses,
  CourseInfo,
  Registration,
  Login,
  CourseForm,
  PrivateRoute,
} from "./components";

import styles from "./App.module.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuthorsThunk } from "./store/thunks/authorsThunk";
import { getCoursesThunk } from "./store/thunks/coursesThunk";
// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * wrap your App with BrowserRouter in src/index.js
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * wrap your App with Redux Provider in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component

function App() {
  // write your code here
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorsThunk());
    dispatch(getCoursesThunk());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <div className={styles.container}>
        <Routes>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/courses/add"
            element={
              <PrivateRoute>
                <CourseForm></CourseForm>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/courses/update/:courseId"
            element={
              <PrivateRoute>
                <CourseForm></CourseForm>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/courses/:courseId"
            element={<CourseInfo data-testid="courseInfo" />}
          ></Route>
          <Route path="/courses" element={<Courses></Courses>}></Route>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/courses"></Navigate>
              ) : (
                <Login></Login>
              )
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
