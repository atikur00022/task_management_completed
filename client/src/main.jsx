import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../src/assets/css/Sidebar.css'
import '../src/assets/css/dropdownmenu.css'
import '../src/assets/css/style.css'
import '../src/assets/css/progress.css'
import {Provider} from "react-redux";
import store from "./redux/store/Store.js";
import 'sweetalert2/dist/sweetalert2.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
