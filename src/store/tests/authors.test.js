import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { authorsSlice, setAuthors, saveAuthor } from "../slices/authorsSlice";
import { getAuthorsThunk } from "../thunks/authorsThunk";
import { getAuthors } from "../../services";
jest.mock("../../services");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getAuthorsThunk", () => {
  it("dispatch authors thunk", async () => {
    const store = mockStore({ authors: [] });
    getAuthors.mockResolvedValueOnce([{ id: "1", name: "Author One" }]);

    await store.dispatch(getAuthorsThunk());

    const actions = store.getActions();
    expect(actions[0]).toEqual(setAuthors([{ id: "1", name: "Author One" }]));
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
