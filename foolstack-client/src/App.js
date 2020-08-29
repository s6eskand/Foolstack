import React from 'react';
import './App.css';

// redux
import {
    store,
    persistor
} from "./redux/store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";

// components
import Homepage from "./base/landing/Homepage";

function App() {
  return (
    <div>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <BrowserRouter>
                    <Homepage />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </div>
  );
}

export default App;
