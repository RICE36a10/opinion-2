import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { Comment as CommentType } from "@/types/request";

const Comments: React.FC<{
  comments: CommentType[];
}> = ({ comments }) => {
  const count = comments.length;
  if (!count)
    return (
      <NoComment>
        <SectionHeading>
          No comments yet. Be the first to leave a comment!
        </SectionHeading>
      </NoComment>
    );
  return (
    <CommentsContainer>
      <SectionHeading>{`${count} ${
        count === 1 ? "Comment" : "Comments"
      }`}</SectionHeading>
      <CommentsWrapper>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </CommentsWrapper>
    </CommentsContainer>
  );
};
const SectionHeading = styled.h2`
  font-weight: bold;
  font-size: var(--h3-size);
  line-height: var(--h3-line);
  letter-spacing: var(--h3-spacing);
  color: var(--text-primary);
`;
const CommentsContainer = styled.section`
  border-radius: var(--border-radius);
  background: var(--primary-color);
  padding: 24px 34px 40px;
  @media (max-width: 767.98px) {
    padding: 24px;
  }
  ${SectionHeading} {
    margin-bottom: 28px;
    @media (max-width: 767.98px) {
      margin-bottom: 24px;
    }
  }
`;

const NoComment = styled.section`
  border-radius: var(--border-radius);
  background: var(--primary-color);
  padding: 70px 34px;
  @media (max-width: 767.98px) {
    padding: 50px 24px;
  }
`;
const CommentsWrapper = styled.div``;

export default Comments;
