import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Textbox } from "@/styles/Textbox";
import { InputWrapper, ErrorMessage, SubmitBtn } from "./PostReply";
import { addComment } from "@/services/comment";
import useAsync from "@/utils/hooks/useAsync";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { editUserEmail } from "@/utils/helper";
import { openModal } from "@/redux/slices/modalSlice";
import { Comment } from "@/types/request";
import { Timestamp } from "firebase/firestore";
import { addComment as addCommentAction } from "@/redux/slices/commentSlice";
const AddComment: React.FC<{
  feedbackId: string;
}> = ({ feedbackId }) => {
  const { user } = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch<AppDispatch>();
  const [commentText, setCommentText] = useState("");
  const [isError, setIsError] = useState(false);
  const { execute: executeAddComment } = useAsync(
    addComment as (...args: unknown[]) => Promise<Comment | undefined>,
    {
      onSuccess: (response) => {
        dispatch(addCommentAction(response));
      },
    }
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      if (commentText.length > 0) {
        const commentData = {
          content: commentText,
          user: {
            image: user.photoURL,
            name: user.displayName,
            username: editUserEmail(user.email!),
            uid: user.uid,
          },
          createdAt: Timestamp.now().toMillis(),
        };
        setIsError(false);
        setCommentText("");
        executeAddComment(feedbackId, commentData);
      } else {
        setIsError(true);
      }
    } else {
      dispatch(openModal());
    }
  };
  const leftChar = 250 - commentText.length;
  return (
    <AddCommentWrapper>
      <SectionTitle>Add Comment</SectionTitle>
      <CommentForm onSubmit={onSubmit}>
        <InputWrapper>
          {" "}
          <Textbox
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCommentText(e.target.value)
            }
            placeholder="Type your comment here"
            value={commentText}
            $isError={isError}
            maxLength={250}
          />
          {isError && <ErrorMessage>Comment can't be empty</ErrorMessage>}
        </InputWrapper>
        <ButtonWrapper>
          <AlertMessage>{leftChar} characters left</AlertMessage>
          <SubmitBtn type="submit">Post Comment</SubmitBtn>
        </ButtonWrapper>
      </CommentForm>
    </AddCommentWrapper>
  );
};
const CommentForm = styled.form``;
const AddCommentWrapper = styled.section`
  background: var(--primary-color);
  padding: 24px 34px;
  border-radius: var(--border-radius);
  @media (max-width: 767.98px) {
    padding: 24px;
  }
`;
const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: var(--h3-size);
  line-height: var(--h3-line);
  letter-spacing: var(--h3-spacing);
  color: var(--text-primary);
  margin-bottom: 24px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;
const AlertMessage = styled.span`
  color: var(--text-secondary);
  font-size: var(--body2-size);
  line-height: var(--body2-line);
  font-weight: 400;
  @media (max-width: 767.68px) {
    font-size: var(--body3-size);
    line-height: var(--body3-line);
  }
`;
export default AddComment;
