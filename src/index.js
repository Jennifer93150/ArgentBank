import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { store , persistor, setToken } from "../src/redux/store";

import reportWebVitals from './reportWebVitals';

/** Pages */
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { User } from './pages/User';

const token = store.getState().token; 

if (token) { 
  store.dispatch(setToken(token)); 
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
     <Provider store={store}> 
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/" index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/user" element={<User/>}/> 
            
            {/* <Route exact path="*" element={<Error />}/> */}
          </Routes>
      </PersistGate>
     </Provider> 
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
