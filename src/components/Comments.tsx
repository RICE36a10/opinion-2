import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { SingleRequest } from "@/types/request";

const Comments: React.FC<{ feedback: SingleRequest }> = ({ feedback }) => {
  const { comments } = feedback;
  return (
    <CommentsContainer>
      <h2 className="c-count">{comments.length} Comments</h2>
      <CommentsWrapper>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </CommentsWrapper>
    </CommentsContainer>
  );
};
const CommentsContainer = styled.section`
  border-radius: var(--border-radius);
  background: var(--primary-color);
  padding: 32px 24px;
  .c-count {
    font-weight: bold;
    font-size: var(--h3-size);
    line-height: var(--h3-line);
    letter-spacing: var(--h3-spacing);
    color: var(--text-primary);
    margin-bottom: 28px;
  }
`;
const CommentsWrapper = styled.div``;

export default Comments;
