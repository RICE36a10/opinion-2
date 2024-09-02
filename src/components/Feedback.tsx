import React from "react";
import styled from "styled-components";
import UpvoteButton from "./UI/UpvoteButton";
import CommentIcon from "@/assets/shared/icon-comments.svg";
import { ProductRequest } from "@/types/productRequest";
const Feedback: React.FC<{ feedback: ProductRequest }> = ({ feedback }) => {
  const { title, description, category, comments, upvotes, id } = feedback;
  const isComments = comments?.length;
  return (
    <FeedbackWrapper>
      <ContentWrapper>
        <UpvoteButton vote={upvotes} productId={String(id)} />
        <Content>
          <h3>{title}</h3>
          <p>{description}</p>
          <span>{category}</span>
        </Content>
      </ContentWrapper>

      <Comment>
        <img src={CommentIcon} alt="comment" />
        <span className={!isComments ? "opacity" : ""}>
          {isComments ? comments.length : 0}
        </span>
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
  cursor: pointer;
  @media (max-width: 767.98px) {
    gap: unset;
    position: relative;
    padding: 24px;
  }
  &:hover h3 {
    color: var(--link-color);
  }
  &:not(:last-of-type) {
    margin-bottom: 20px;
    @media (max-width: 1024px) {
      margin-bottom: 16px;
    }
  }
`;
const Content = styled.div`
  h3 {
    font-weight: bold;
    font-size: var(--h3-size);
    line-height: var(--h3-line);
    letter-spacing: var(h3-spacing);
    margin-bottom: 4px;
    transition: var(--transition);
    @media (max-width: 767.98px) {
      font-size: var(--body3-size);
      line-height: var(--body3-line);
      letter-spacing: -0.18px;
      margin-bottom: 8px;
    }
  }
  p {
    font-size: var(--body1-size);
    line-height: var(--body1-line);
    color: var(--text-secondary);
    font-weight: 400;
    margin-bottom: 12px;
    @media (max-width: 767.98px) {
      font-size: var(--body3-size);
      line-height: var(--body3-line);
      margin-bottom: 8px;
    }
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
  font-weight: bold;
  font-size: var(--body1-size);
  line-height: var(--body1-line);
  letter-spacing: -0.22px;
  color: var(--text-primary);
  .opacity {
    opacity: 0.5;
  }
  @media (max-width: 767.98px) {
    position: absolute;
    right: 24px;
    bottom: 32px;
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    letter-spacing: -0.18px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: baseline;
  @media (max-width: 767.98px) {
    flex-direction: column-reverse;
    gap: 16px;
  }
`;
export default Feedback;
