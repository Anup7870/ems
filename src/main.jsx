import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/Store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
   <PersistGate persistor={persistor}>
      <Provider store={store}>
         <BrowserRouter>
            <ChakraProvider>
               <App />
            </ChakraProvider>
         </BrowserRouter>
      </Provider>
   </PersistGate>
);
