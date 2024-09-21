import { createBrowserRouter } from "react-router-dom";
import { Home, FeedbackDetail, AddFeedback } from "../pages/index";
import { scrollRestoration } from "@/utils/helper";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    ...scrollRestoration(),
  },
  {
    path: "/feedback",
    children: [
      { path: ":id", element: <FeedbackDetail /> },
      { path: "add", element: <AddFeedback /> },
    ],
    ...scrollRestoration(),
  },
]);
