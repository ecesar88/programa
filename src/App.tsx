import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import { Client } from "./screens/Client";
import { Home } from "./screens/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Home />,
    },
    {
      path: ROUTES.CLIENTS,
      element: <Client />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
