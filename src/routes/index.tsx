import { createBrowserRouter } from "react-router-dom";
import { Home, FeedbackDetail } from "../pages/index";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/feedbacks/:id",
    element: <FeedbackDetail />,
  },
]);
