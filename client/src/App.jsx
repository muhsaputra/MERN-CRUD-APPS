import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./getuser/User.jsx";
import AddUser from "./adduser/AddUser.jsx";
import Update from "./updateuser/Update.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
