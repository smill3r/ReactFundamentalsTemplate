// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React from "react";

import { formatCreationDate, getCourseDuration } from "../../helpers";

import { Link, useParams } from "react-router-dom";

import styles from "./styles.module.css";
import { useSelector } from "react-redux";

// props description
// * 'coursesList' - list of all courses. You need it to get chosen course from the list
// * 'authorsList' - list of all authors. You need it to get authors' names for chosen course
// * 'showCourseId' - id of chosen course. Use it to find needed course on the 'coursesList'.
export const CourseInfo = () => {
  // write your code here
  const coursesList = useSelector((state) => state.courses);
  const authorsList = useSelector((state) => state.authors);
  const { courseId } = useParams();
  const course = coursesList.find((courses) => courses.id === courseId);
  return (
    <>
      <div className={styles.container} data-testid="courseInfo">
        <h1>{course.title}</h1>
        <div className={styles.courseInfo}>
          <div className={styles.description}>
            <h2>Description:</h2>
            <p>{course.description}</p>
          </div>
          <div>
            <p>
              <b>ID: </b>
              {course.id}
            </p>
            <p>
              <b>Duration: </b>
              {getCourseDuration(course.duration)}
            </p>
            <p>
              <b>Created: </b>
              {formatCreationDate(course.creationDate)}
            </p>
            <div>
              <b>Authors</b>
              <ul className={styles.authorsList}>
                {authorsList.map((author) => {
                  if (course.authors.includes(author.id)) {
                    return <li key={author.id}>{author.name}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.backButton}>
        <Link to={"/courses"}>BACK</Link>
      </div>
    </>
  );
};
