import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Toaster } from 'react-hot-toast';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Add all free solid icons to the library
library.add(fas);

import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far); // Add regular icons to the library

import CartContextProvider from './context/CartContext';
import { UserContext, UserProvider } from './context/UserContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider >
        <CartContextProvider>
           <App />
           <Toaster/>
        </CartContextProvider>
    </UserProvider>    
  </StrictMode>,
)
