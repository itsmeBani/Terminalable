import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ThemeProvider} from "@material-tailwind/react";
import CurrentUser from "./Context/CurrentUser.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
      <CurrentUser>
          <App />
      </CurrentUser>
    </ThemeProvider>
)
