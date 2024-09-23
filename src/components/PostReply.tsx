import React, { ChangeEvent, useState } from "react";
import useAsync from "@/utils/hooks/useAsync";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { editUserEmail } from "@/utils/helper";
import { openModal } from "@/redux/slices/modalSlice";
import { Textbox } from "@/styles/Textbox";
import { CommonButton } from "@/styles/CommonButton";
import { Timestamp } from "firebase/firestore";
import styled from "styled-components";
import { addReply } from "@/services/comment";
import { Reply } from "@/types/request";
import { setComments } from "@/redux/slices/commentSlice";
const PostReply: React.FC<{
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
  replyingTo: string;
  commentId: string;
  feedbackId: string;
}> = ({ setReplying, replyingTo, feedbackId, commentId }) => {
  const [replyContent, setReplyContent] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.User);
  const { comments } = useSelector((state: RootState) => state.Comment);
  const { execute: executeAddReply } = useAsync(
    addReply as (...args: unknown[]) => Promise<Reply | undefined>,
    {
      onSuccess: (response) => {
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, response!]
                : [response!],
            };
          }
          return comment;
        });

        dispatch(setComments(updatedComments));
      },
    }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      if (replyContent.length) {
        const replyData = {
          content: replyContent,
          user: {
            image: user.photoURL,
            name: user.displayName,
            username: editUserEmail(user.email!),
            uid: user.uid,
          },
          replyingTo: replyingTo,
          createdAt: Timestamp.now().toMillis(),
        };
        setReplying(false);
        setIsError(false);
        executeAddReply(feedbackId, commentId, replyData);
      } else {
        setIsError(true);
      }
    } else {
      dispatch(openModal());
    }
  };
  return (
    <ReplyForm onSubmit={onSubmit}>
      <InputWrapper>
        {" "}
        <Textbox
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setReplyContent(e.target.value)
          }
          placeholder="Type your reply here"
          value={replyContent}
          $isError={isError}
        />
        {isError && <ErrorMessage>Reply can't be empty</ErrorMessage>}
      </InputWrapper>

      <SubmitBtn type="submit">Post Reply</SubmitBtn>
    </ReplyForm>
  );
};
const ReplyForm = styled.form`
  display: flex;
  align-items: flex-start;
  margin-top: 24px;
  gap: 16px;
  @media (max-width: 767.68px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  @media (max-width: 767.98px) {
    width: 100%;
  }
`;
export const SubmitBtn = styled(CommonButton)`
  background: var(--button-color);
  &:hover {
    background: #c75af6;
  }
`;
export const ErrorMessage = styled.span`
  color: var(--error-color);
  @media (max-width: 767.68px) {
    font-size: var(--body3-size);
    line-height: var(--body3-line);
  }
`;
export default PostReply;
