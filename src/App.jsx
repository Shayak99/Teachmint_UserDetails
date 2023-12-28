import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserDirectory } from "./pages/UserDirectory";
import { UserProfile } from "./pages/UserProfile";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserDirectory />
  },
  {
    path: '*',
    element: <ErrorPage />
  },
  {
    path: 'user/:userId',
    element: <UserProfile />
  }
]);

function App() {
  return (
   <div className="app">
      <RouterProvider router={router} />
   </div>
  );
}

export default App;
