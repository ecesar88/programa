import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import { Clients } from "./screens/Clients";
import { Home } from "./screens/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Home />,
      children: [
        {
          path: ROUTES.CLIENTS,
          element: <Clients />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
