import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";

const BASENAME = process.env.NODE_ENV === 'development' ? "" : "/react-stellar-burger";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={BASENAME}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
