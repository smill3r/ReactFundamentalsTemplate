import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";

const mockedState = {
  user: {
    token: "Bearer token",
    isAuth: true,
    name: "Pan Talaimon",
    email: "pan@talaimon.com",
    role: "admin",
  },
  courses: [
    {
      title: "title",
      description: "description",
      creationDate: "9/3/2021",
      duration: 30,
      authors: [
        "9b87e8b8-6ba5-40fc-a439-c4e30a373d36",
        "072fe3fc-e751-4745-9af5-aa9eed0ea9ed",
        "1c972c52-3198-4098-b6f7-799b45903199",
      ],
      id: "66cc289e-6de9-49b2-9ca7-8b4f409d6467",
    },
    {
      title: "title",
      description: "description",
      duration: 30,
      authors: [
        "9b87e8b8-6ba5-40fc-a439-c4e30a373d36",
        "9987de6a-b475-484a-b885-622b8fb88bda",
        "5e0b0f18-32c9-4933-b142-50459b47f09e",
      ],
      creationDate: "01/04/2024",
      id: "d33671b7-5d07-437e-9e32-a981a5049ed5",
    },
    {
      title: "asdasd",
      description: "asdasdasdasdasd",
      duration: 23,
      authors: [
        "072fe3fc-e751-4745-9af5-aa9eed0ea9ed",
        "40b21bd5-cbae-4f33-b154-0252b1ae03a9",
      ],
      creationDate: "01/04/2024",
      id: "3f480541-7687-4ae0-b097-fc0fc9c1a639",
    },
  ],
  authors: [
    {
      name: "author",
      id: "9b87e8b8-6ba5-40fc-a439-c4e30a373d36",
    },
    {
      name: "author2",
      id: "1c972c52-3198-4098-b6f7-799b45903199",
    },
    {
      name: "author3",
      id: "072fe3fc-e751-4745-9af5-aa9eed0ea9ed",
    },
    {
      name: "author4",
      id: "40b21bd5-cbae-4f33-b154-0252b1ae03a9",
    },
    {
      name: "author5",
      id: "5e0b0f18-32c9-4933-b142-50459b47f09e",
    },
    {
      name: "author6",
      id: "9987de6a-b475-484a-b885-622b8fb88bda",
    },
    {
      name: "string",
      id: "7432c74f-471d-4a08-9b4d-49b5054a45ea",
    },
  ],
};

export const mockedUser = mockedState.user;

export const mockedCourse = mockedState.courses[0];

export const mockedCoursesList = mockedState.courses;

export const mockedCourseAuthors = mockedState.courses[0].authors.map((id) =>
  mockedState.authors.find((author) => author.id === id)
);

export const mockedAuthors = mockedState.authors;

export const mockedStore = {
  getState: () => mockedState,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

export const MockedWrapper = ({ children, store = mockedStore }) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);
