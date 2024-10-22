<<<<<<< HEAD
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'


axios.defaults.withCredentials = true

<<<<<<< HEAD
import { ThemeProvider } from "@material-tailwind/react";
 
const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
=======
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
