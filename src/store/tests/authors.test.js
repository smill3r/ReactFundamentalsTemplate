import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { authorsSlice, setAuthors, saveAuthor } from "../slices/authorsSlice";
import { createAuthorThunk, getAuthorsThunk } from "../thunks/authorsThunk";
import { createAuthor, getAuthors } from "../../services";
import { mockedAuthors } from "../../testUtils";
jest.mock("../../services");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getAuthorsThunk", () => {
  it("dispatch authors thunk", async () => {
    const store = mockStore({ authors: [] });
    getAuthors.mockResolvedValueOnce([mockedAuthors[0]]);

    await store.dispatch(getAuthorsThunk());

    const actions = store.getActions();
    expect(actions[0]).toEqual(setAuthors([mockedAuthors[0]]));
  });

  it("dispatch create authors thunk", async () => {
    const store = mockStore({ authors: [] });
    createAuthor.mockResolvedValueOnce(mockedAuthors[0]);

    await store.dispatch(createAuthorThunk());

    const actions = store.getActions();
    expect(actions[0]).toEqual(saveAuthor(mockedAuthors[0]));
  });
});

describe("Authors slice", () => {
  test("set authors", () => {
    const initialState = [];
    const expectedAuthors = [{ id: "1", name: "Author One" }];
    expect(
      authorsSlice.reducer(initialState, setAuthors(expectedAuthors))
    ).toEqual(expectedAuthors);
  });

  test("save new author", () => {
    const initialState = [{ id: "1", name: "Author One" }];
    const newAuthor = { id: "2", name: "Author Two" };
    expect(authorsSlice.reducer(initialState, saveAuthor(newAuthor))).toEqual([
      ...initialState,
      newAuthor,
    ]);
  });
});
