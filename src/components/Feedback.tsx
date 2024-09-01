import React from "react";
import styled from "styled-components";
import UpvoteButton from "./UI/UpvoteButton";
import CommentIcon from "@/assets/shared/icon-comments.svg";
const Feedback = () => {
  return (
    <FeedbackWrapper>
      <UpvoteButton />
      <Content>
        <h3>Add a dark theme option</h3>
        <p>
          It would help people with light sensitivities and who prefer dark
          mode.
        </p>
        <span>Feature</span>
      </Content>
      <Comment>
        <img src={CommentIcon} alt="comment" />
        <span>99</span>
      </Comment>
    </FeedbackWrapper>
  );
};

const FeedbackWrapper = styled.div`
  display: flex;
  gap: 40px;
  padding: 28px 32px;
  border-radius: var(--border-radius);
  background: var(--primary-color);
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;
const Content = styled.div`
  h3 {
    font-weight: bold;
    font-size: var(--h3-size);
    line-height: var(--h3-line);
    letter-spacing: var(h3-spacing);
    margin-bottom: 4px;
  }
  p {
    font-size: var(--body1-size);
    line-height: var(--body1-line);
    color: var(--text-secondary);
    font-weight: 400;
    margin-bottom: 12px;
  }
  span {
    background: var(--bg-secondary);
    color: var(--link-color);
    padding: 6px 16px;
    font-weight: 600;
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    border-radius: var(--border-radius);
    transition: var(--transition);
  }
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;
export default Feedback;
