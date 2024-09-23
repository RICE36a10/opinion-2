import React from "react";
import styled from "styled-components";
import UpvoteButton from "./UI/UpvoteButton";
import CommentIcon from "@/assets/shared/icon-comments.svg";
import { Request, SingleRequest } from "@/types/request";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Categories } from "@/utils/constants/Categories";

const Feedback: React.FC<{
  feedback: Request | SingleRequest;
  isSingle?: boolean;
}> = ({ feedback, isSingle }) => {
  const { comments } = useSelector((state: RootState) => state.Comment);
  const { title, description, category, commentCount, upvotes, id, upvotedBy } =
    feedback;
  const [commentC, setCommentC] = useState(commentCount);
  const categoryName = Categories.filter(
    (cat) => cat.toLowerCase() === category
  )[0];

  useEffect(() => {
    setCommentC(comments.length);
  }, [comments]);
  const isComments = isSingle ? commentC : commentCount;
  const FeedbackContent = (
    <FeedbackWrapper>
      <ContentWrapper>
        <UpvoteButton vote={upvotes} id={id} upvotedBy={upvotedBy} />
        <Content>
          <h3>{title}</h3>
          <p>{description}</p>
          <span>{categoryName}</span>
        </Content>
      </ContentWrapper>

      <Comment>
        <img src={CommentIcon} alt="comment" />
        <span className={!isComments ? "opacity" : ""}>
          {!isComments ? 0 : isSingle ? commentC : commentCount}
        </span>
      </Comment>
    </FeedbackWrapper>
  );
  return isSingle ? (
    FeedbackContent
  ) : (
    <Link to={`/feedbacks/${id}`}>{FeedbackContent}</Link>
  );
};

const FeedbackWrapper = styled.div`
  display: flex;
  gap: 40px;
  padding: 28px 32px;
  border-radius: var(--border-radius);
  background: var(--primary-color);

  @media (max-width: 767.98px) {
    gap: unset;
    position: relative;
    padding: 24px;
  }
  &:hover h3 {
    color: var(--link-color);
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
    color: var(--text-primary);
    &:hover {
      color: var(--link-color);
    }
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
