import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import { Clients } from "./screens/Clients";
import { Home } from "./screens/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
