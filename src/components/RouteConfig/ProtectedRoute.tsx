import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React from "react";
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.User);
  const { feedbackData } = useSelector((state: RootState) => state.Feedback);
  const feedback = feedbackData.find((f) => f.id === id);

  if (!user || !feedback || feedback.authorId !== user.uid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
