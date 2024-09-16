import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { Comment as CommentType } from "@/types/request";

const Comments: React.FC<{
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}> = ({ comments, setComments }) => {
  return (
    <CommentsContainer>
      <h2 className="c-count">{comments.length} Comments</h2>
      <CommentsWrapper>
        {comments.map((comment) => (
          <Comment comment={comment} setComments={setComments} />
        ))}
      </CommentsWrapper>
    </CommentsContainer>
  );
};
const CommentsContainer = styled.section`
  border-radius: var(--border-radius);
  background: var(--primary-color);
  padding: 24px 34px 40px;
  @media (max-width: 767.98px) {
    padding: 24px;
  }
  .c-count {
    font-weight: bold;
    font-size: var(--h3-size);
    line-height: var(--h3-line);
    letter-spacing: var(--h3-spacing);
    color: var(--text-primary);
    margin-bottom: 28px;
    @media (max-width: 767.98px) {
      margin-bottom: 24px;
    }
  }
`;
const CommentsWrapper = styled.div``;

export default Comments;
