import React from "react";
import StyleForm from "./StyleForm";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("StyleForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      myState: "testing",
    });
    store.dispatch = jest.fn();
  });


  it('should display a title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <StyleForm />
      </Provider>
    );
    expect(getByText('Style TEST')).toBeInTheDocument();
  })

  describe('Tops Category', () => {
  
    it('should display a subheading for the tops selection', () => {
      const { getByText } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      expect(getByText("Pick the set of tops that makes your heart sing")).toBeInTheDocument();
    })
  
    it('should display three photos for tops category category', () => {
      const { getByAltText } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      expect(getByAltText("Photo of goth-style tops")).toBeInTheDocument();
      expect(getByAltText("Photo of victorian-style tops")).toBeInTheDocument();
      expect(getByAltText("Photo of cosplay-style tops")).toBeInTheDocument();
    })

  })

  describe('Bottoms Category', () => {
    it("should switch to bottoms category when you click a tops photo and display" +
      "a subheading for the bottoms section", () => {
      const { getByText, getByAltText } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      fireEvent.click(getByAltText("Photo of goth-style tops"));
      expect(getByText("Pick the set of bottoms that makes your heart sing")).toBeInTheDocument();
    });

    it("should display three photos for bottoms category", () => {
      const { getByAltText, debug } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      fireEvent.click(getByAltText("Photo of goth-style tops"));
      expect(getByAltText("Photo of goth-style bottoms")).toBeInTheDocument();
      expect(getByAltText("Photo of victorian-style bottoms")).toBeInTheDocument();
      expect(getByAltText("Photo of cosplay-style bottoms")).toBeInTheDocument();
    });
  })

  describe('Accessories Category', () => {
    it("should switch to accessories category when you click a bottoms photo and display" +
      "a subheading for the accessories section", () => {
      const { getByText, getByAltText } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      fireEvent.click(getByAltText("Photo of goth-style tops"));
      fireEvent.click(getByAltText("Photo of goth-style bottoms"));
      expect(getByText("Pick the set of accessories that makes your heart sing")).toBeInTheDocument();
    });

    it("should display three photos for accessories category", () => {
      const { getByAltText } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      fireEvent.click(getByAltText("Photo of goth-style tops"));
      fireEvent.click(getByAltText("Photo of goth-style bottoms"));
      expect(getByAltText("Photo of goth-style accessories")).toBeInTheDocument();
      expect(getByAltText("Photo of victorian-style accessories")).toBeInTheDocument();
      expect(getByAltText("Photo of cosplay-style accessories")).toBeInTheDocument();
    });
  })
  
  describe('Shoes Category', () => {
    it("should switch to shoes category when you click an accessories photo and display" +
      "a subheading for the shoes section", () => {
      const { getByText, getByAltText } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      fireEvent.click(getByAltText("Photo of goth-style tops"));
      fireEvent.click(getByAltText("Photo of goth-style bottoms"));
      fireEvent.click(getByAltText("Photo of goth-style accessories"));
      expect(getByText("Pick the set of shoes that makes your heart sing")).toBeInTheDocument();
    });

    it("should display three photos for shoes category", () => {
      const { getByAltText } = render(
        <Provider store={store}>
          <StyleForm />
        </Provider>
      );
      fireEvent.click(getByAltText("Photo of goth-style tops"));
      fireEvent.click(getByAltText("Photo of goth-style bottoms"));
      fireEvent.click(getByAltText("Photo of goth-style accessories"));
      expect(getByAltText("Photo of goth-style shoes")).toBeInTheDocument();
      expect(getByAltText("Photo of victorian-style shoes")).toBeInTheDocument();
      expect(getByAltText("Photo of cosplay-style shoes")).toBeInTheDocument();
    });
  })
  it('should display a summary of all styles chosen at the end of the survey', () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <StyleForm />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(getByAltText("Photo of victorian-style tops"));
    fireEvent.click(getByAltText("Photo of goth-style bottoms"));
    fireEvent.click(getByAltText("Photo of goth-style accessories"));
    fireEvent.click(getByAltText("Photo of goth-style shoes"));
    expect(getByText('Your style is victorian and goth'))
  })
})