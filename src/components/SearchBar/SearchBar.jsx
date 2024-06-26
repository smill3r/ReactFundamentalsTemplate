import { useState } from "react";
import { Input, Button } from "../../common";

export const SearchBar = ({ onFilterCourses, coursesList }) => {
  const [term, setTerm] = useState("");

  const onTextChange = (text) => {
    if (!text) {
      onFilterCourses(coursesList);
    } else {
      setTerm(text);
    }
  };

  const filter = () => {
    const filteredList = coursesList.filter((course) => {
      if (
        course.id.toLowerCase().includes(term.toLowerCase()) ||
        course.title.toLowerCase().includes(term.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    onFilterCourses(filteredList);
  };

  return (
    <>
      <Input
        placeholderText="Input text"
        onChange={(e) => onTextChange(e.target.value)}
      ></Input>
      <Button handleClick={filter} buttonText="SEARCH"></Button>
    </>
  );
};
