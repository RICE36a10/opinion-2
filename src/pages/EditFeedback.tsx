import FeedbackForm from "@/components/FeedbackForm";
import { useLocation } from "react-router-dom";
const EditFeedback = () => {
  const location = useLocation();
  const feedbackData = location.state?.data;
  const path = location.state?.path;
  return <FeedbackForm edit={true} path={path} feedback={feedbackData} />;
};

export default EditFeedback;
