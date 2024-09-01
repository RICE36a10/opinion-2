import React from "react";
import styled from "styled-components";
import Feedback from "./Feedback";
const FeedbackContainer = () => {
  return (
    <FeedbackWrapper>
      <Feedback />
    </FeedbackWrapper>
  );
};
const FeedbackWrapper = styled.section`
  padding: 20px 0;
`;
export default FeedbackContainer;
