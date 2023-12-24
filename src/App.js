import { Suspense } from "react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import SignUp from "./components/signUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./components/server/auth-context";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SignUp /> },
    { path: "/homepage", element: <HomePage /> },
  ]);
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      {/* RouterProvider to provide routing context */}
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
