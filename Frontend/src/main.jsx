import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Provider } from "@/components/ui/provider"
import './index.css';
import MainLayout from "./Layout/MainLayout.jsx";
import Homepage from "./routes/Homepage.jsx";
import CreatePage from "./routes/CreatePage.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
// import {ChakraProvider} from "@chakra-ui/react";


const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <Homepage /> },
            { path: "/create", element: <CreatePage /> },
        ],
    },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      {/* Wrapping the RouterProvider with Provider for UI components */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
