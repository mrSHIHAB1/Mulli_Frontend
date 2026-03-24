import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Routes/Routes';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
     <ToastContainer position="top-right"  autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable theme="light"/>
  </StrictMode>
)
