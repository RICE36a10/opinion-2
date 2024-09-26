import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  FeedbackDetail,
  AddFeedback,
  EditFeedback,
  Roadmap,
} from "../pages/index";
import RootComponent from "@/components/RouteConfig/RootComponent";
import ProtectedRoute from "@/components/RouteConfig/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "feedbacks",
        children: [
          {
            path: ":id",
            element: <FeedbackDetail />,
          },
          {
            path: ":id/edit",
            element: (
              <ProtectedRoute edit>
                <EditFeedback />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute>
                <AddFeedback />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "roadmap",
        element: <Roadmap />,
      },
    ],
  },
]);
