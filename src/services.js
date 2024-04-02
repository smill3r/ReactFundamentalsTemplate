export const createUser = async (data) => {
  // write your code here

  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => new Error(err));
  return await response.json();
};

export const login = async (data) => {
  // write your code here
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => new Error(err));
  return await response.json();
};

export const getCourses = async () => {
  // write your code here
  const response = await fetch("http://localhost:4000/courses/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => new Error(err));

  const result = await response.json();

  return result.result;
};

export const getAuthors = async () => {
  // write your code hereconst
  const response = await fetch("http://localhost:4000/authors/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => new Error(err));

  const result = await response.json();

  return result.result;
};

export const getCurrentUser = async (token) => {
  // write your code here
  const response = await fetch("http://localhost:4000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).catch((err) => new Error(err));

  const result = await response.json();

  return result.result;
};

export const updateCourseService = async (payload, token, id) => {
  // write your code here
  const response = await fetch(`http://localhost:4000/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).catch((err) => new Error(err));
  const result = await response.json();

  return result.result;
};

export const logout = async (token) => {
  // write your code here
  const response = await fetch("http://localhost:4000/users/me", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).catch((err) => new Error(err));
  const result = await response.json();

  return result.result;
};

export const deleteCourseService = async (id, token) => {
  // write your code here
  const response = await fetch(`http://localhost:4000/courses/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).catch((err) => new Error(err));
  return await response.json();
};

export const createCourse = async (payload, token) => {
  // write your code here
  const response = await fetch("http://localhost:4000/courses/add", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).catch((err) => new Error(err));
  const result = await response.json();

  return result.result;
};

export const createAuthor = async (payload, token) => {
  // write your code here
  const response = await fetch("http://localhost:4000/authors/add", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).catch((err) => new Error(err));
  const result = await response.json();

  return result.result;
};
