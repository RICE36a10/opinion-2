import React from "react";
import styled from "styled-components";
import Feedback from "./Feedback";
import { getAllFeedbacks } from "@/api/services/feedback";
import useAsync from "@/utils/hooks/useAsync";
import { ProductRequest } from "@/types/productRequest";
import loadingImg from "@/assets/loading-gear.svg";
import NotFound from "./NotFound";
const FeedbackContainer = () => {
  const { data: feedbackData, loading: isDataLoading } = useAsync(
    () => getAllFeedbacks(),
    {
      immediate: true,
    }
  );

  const renderFeedbacks = () => {
    if (isDataLoading) {
      return (
        <Loading>
          <img src={loadingImg} alt="Loading" />
        </Loading>
      );
    }
    if (feedbackData?.length === 0) {
      return <NotFound />;
    }
    return feedbackData?.map((feedback: ProductRequest) => (
      <Feedback key={feedback.id} feedback={feedback} />
    ));
  };

  return <FeedbackWrapper>{renderFeedbacks()}</FeedbackWrapper>;
};
const FeedbackWrapper = styled.section`
  padding: 20px 0;
  flex: 1;
  @media (max-width: 1024px) {
    padding: 24px 0;
  }
  @media (max-width: 767.98px) {
    padding: 32px 24px 48px;
  }
`;
const Loading = styled.div`
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
