import React from "react";
import App from "./App";
import { fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import { render as statefulRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, store } from "../store";
import { createMemoryHistory } from "history";

const render = (ui, initialState = {},
  store = createStore(rootReducer, initialState)) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  }
  return statefulRender(ui, { wrapper: Wrapper });
}

describe("Integration test", () => {
  describe("StyleForm Routing", () => {
    it("a user should be able to sign up", async () => {
      const { getByText, getAllByText, getByPlaceholderText } = render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
      fireEvent.click(getByText("Login", { exact: false }));
      fireEvent.change(getByPlaceholderText("Email"), {
        target: { value: `arthurlovescatz123@aol.com` },
      });
      fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "catz4lyfe" },
      });
      fireEvent.click(getAllByText("Login", { exact: false })[2]);
      await waitFor(() => {
        expect(
          getByText("Crates for everyone!", { exact: false })
        ).toBeInTheDocument();
      });
    });
  
    it("should direct to style form upon clicking the crates button" +
        "if the user has not filled out a style survey yet",
      async () => {
        const history = createMemoryHistory();
        history.push("/crates");
        const { getByText, getAllByText, debug } = render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>
        );
        await waitFor(() => {
          fireEvent.click(getAllByText("Subscribe", { exact: false })[1]);
        });
        await waitFor(() => {
          expect(
            getByText("Pick the set of tops that makes your heart sing")
          ).toBeInTheDocument();
          fireEvent.click(getByText("Profile", { exact: false }));
          fireEvent.click(getByText("Logout", { exact: false }));
        });
      }
    );
  
    it("should direct to crates page if the user has a style attribute set",
      async () => {
        const history = createMemoryHistory();
        history.push("/");
        const { getByText, getAllByText, debug, getByPlaceholderText } = render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>
        );
        fireEvent.click(getByText("Login", { exact: false }));
        fireEvent.change(getByPlaceholderText("Email"), {
          target: { value: `sammyg@aol.com` },
        });
        fireEvent.change(getByPlaceholderText("Password"), {
          target: { value: "sammy1234" },
        });
        fireEvent.click(getAllByText("Login", { exact: false })[2]);
        await waitFor(() => {
          expect(getByText("Crates for everyone!", { exact: false })).toBeInTheDocument();
          expect(store.getState().user.details).toBeTruthy
        });
        await waitFor(() => {
          fireEvent.click(getAllByText("Subscribe", { exact: false })[1]);
          expect(getByText('The crates you are subscribed to are listed here. You can cancel anytime.',
            { exact: false })).toBeInTheDocument()
        })
      }
    );

  })
});
