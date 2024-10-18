import { useEffect } from "react";
import styled from "styled-components";
import Feedback from "./Feedback";
import { Request } from "@/types/request";
import loadingImg from "@/assets/loading-gear.svg";
import NotFound from "./NotFound";
import { sortFeedbacks } from "@/utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getFeedbacks } from "@/redux/actions/feedback";

const FeedbackContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { feedbackData, loading } = useSelector(
    (state: RootState) => state.Feedback
  );
  let sortedFeedbacks: Request[];
  useEffect(() => {
    dispatch(getFeedbacks());
  }, []);

  const { sortBy, filterByCategory: category } = useSelector(
    (state: RootState) => state.Filter
  );

  const renderFeedbacks = () => {
    if (loading) {
      return (
        <Loading>
          <img src={loadingImg} alt="Loading" />
        </Loading>
      );
    }

    if (Array.isArray(feedbackData)) {
      const filteredData = feedbackData.filter(
          (feedback) => feedback.status === "suggestion"
      );
      sortedFeedbacks = sortFeedbacks(filteredData, sortBy.id, category);
    } else {
      console.error("feedbackData is not an array:", feedbackData);
    }

    if (sortedFeedbacks?.length === 0) {
      return <NotFound />;
    }
    return sortedFeedbacks?.map((feedback: Request) => (
      <Feedback key={feedback.id} feedback={feedback} />
    ));
  };

  return <FeedbackWrapper>{renderFeedbacks()}</FeedbackWrapper>;
};
const FeedbackWrapper = styled.section`
  padding: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1024px) {
    padding: 24px 0;
    gap: 16px;
  }
  @media (max-width: 767.98px) {
    padding: 32px 24px 48px;
  }
`;
export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 1024px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default FeedbackContainer;
