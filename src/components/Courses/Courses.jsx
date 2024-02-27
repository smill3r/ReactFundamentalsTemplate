import styles from "./styles.module.css";
import { CourseCard } from "./components";
import { Button } from "../../common";

import { useState } from "react";

import { SearchBar } from "../SearchBar";

// Module 1:
// * render list of components using 'CourseCard' component for each course
// * render 'ADD NEW COURSE' button (reuse Button component)
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#courses-component
// * render EmptyCourseList component when no courses
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#emptycourselist-component

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking Add New Course button.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store. Use selectors...
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.

export const Courses = ({ courses, authorsList, handleShowCourse }) => {
  // write your code here

  const [coursesList, setCourseList] = useState(courses);

  // for EmptyCourseList component container use data-testid="emptyContainer" attribute
  // for button in EmptyCourseList component add data-testid="addCourse" attribute

  return (
    <>
      {coursesList.length > 0 ? (
        <div className={styles.panel}>
          <span>
            <SearchBar
              coursesList={courses}
              filterUsers={setCourseList}
            ></SearchBar>
          </span>
          <Button buttonText="ADD NEW"></Button>
        </div>
      ) : null}
      {coursesList.map((course) => (
        <CourseCard
          course={course}
          handleShowCourse={handleShowCourse}
          authorsList={authorsList}
        ></CourseCard>
      ))}

      {coursesList.length == 0 ? (
        <div className={styles.emptyList}>
          <h1>Your List Is Empty</h1>
          <p>Please use 'Add New Course' button to add your first course</p>
          <Button
            className={styles.marginButton}
            buttonText="ADD NEW COURSE"
          ></Button>
        </div>
      ) : null}
    </>
  );
};
