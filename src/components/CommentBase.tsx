import React, { useState } from "react";
import styled from "styled-components";
import { CommentBaseProps, Reply } from "@/types/request";
import PostReply from "./PostReply";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import useAsync from "@/utils/hooks/useAsync";
import { deleteComment, deleteReply } from "@/services/comment";
import { useParams } from "react-router-dom";
import { setComments } from "@/redux/slices/commentSlice";
export const CommentBase: React.FC<CommentBaseProps> = ({
  user,
  content,
  children,
  replyingTo,
  id,
  replyId,
}) => {
  const [replying, setReplying] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user: AuthUser } = useSelector((state: RootState) => {
    return state.User;
  });
  const { comments } = useSelector((state: RootState) => state.Comment);
  const { id: feedbackId } = useParams<{ id: string }>();
  const childrenArray = React.Children.toArray(children);
  const onReply = () => {
    setReplying((prev) => !prev);
  };
  const { execute: executeDeleteComment } = useAsync(
    deleteComment as (...args: unknown[]) => Promise<Comment | undefined>,
    {
      onSuccess: () => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        dispatch(setComments(updatedComments));
      },
    }
  );
  const { execute: executeDeleteReply } = useAsync(
    deleteReply as (...args: unknown[]) => Promise<Reply | undefined>,
    {
      onSuccess: () => {
        const updatedComments = comments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              replies: comment.replies?.filter((reply) => reply.id !== replyId),
            };
          }
          return comment;
        });
        dispatch(setComments(updatedComments));
      },
    }
  );
  const onDelete = () => {
    if (replyId !== undefined) {
      executeDeleteReply(feedbackId, id, replyId);
    } else {
      executeDeleteComment(feedbackId, id);
    }
  };

  const isAuth = !AuthUser ? false : user.uid === AuthUser?.uid;

  const Content = (
    <>
      <UserContent>
        <UserImg>
          <img src={user.image} alt="User picture" />
        </UserImg>
        <UserInfo>
          <p className="u-name">{user.name}</p>
          <span className="u-username">{user.username}</span>
        </UserInfo>
        <CommentActions>
          <ReplyBtn onClick={onReply}>Reply</ReplyBtn>
          {isAuth && (
            <DeleteBtn title="Delete" onClick={onDelete}>
              <DeleteRoundedIcon sx={{ color: "#ed4337", width: "18px" }} />
            </DeleteBtn>
          )}
        </CommentActions>
      </UserContent>
      <CommentContent>
        <p className="content-text">
          {replyingTo ? <span className="replyTo">@{replyingTo} </span> : ""}
          {content}
        </p>
        {replying && (
          <PostReply
            setReplying={setReplying}
            replyingTo={user.username}
            commentId={id!}
            feedbackId={feedbackId!}
          />
        )}
        {childrenArray.length > 0 && (
          <ReplyContainer>{children}</ReplyContainer>
        )}
      </CommentContent>
    </>
  );
  return replyingTo ? (
    <ReplyWrapper>{Content}</ReplyWrapper>
  ) : (
    <CommentContainer>{Content}</CommentContainer>
  );
};
const ReplyContainer = styled.div`
  @media (max-width: 767.98px) {
    border-left: 1px solid rgba(100, 113, 150, 0.1);
  }
`;
export const ReplyWrapper = styled.div`
  padding-top: 32px;
  @media (max-width: 767.98px) {
    padding-top: 0px;
    margin-top: 24px;
    padding-left: 24px;
  }
  .replyTo {
    font-weight: bold;
    color: var(--button-color);
  }
`;
const CommentContainer = styled.div`
  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(140, 146, 179, 0.25);
    padding-bottom: 32px;
  }
  &:not(:first-of-type) {
    padding-top: 32px;
  }
  @media (max-width: 767.98px) {
    &:not(:last-of-type) {
      padding-bottom: 24px;
    }
    &:not(:first-of-type) {
      padding-top: 24px;
    }
  }
`;
const UserContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;
const UserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 32px;
  @media (max-width: 767.98px) {
    margin-right: 16px;
  }
  img {
    width: 100%;
  }
`;
const UserInfo = styled.div`
  margin-right: auto;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  @media (max-width: 767.98px) {
    font-size: var(--body3-size);
    line-height: var(--body3-line);
  }
  .u-name {
    letter-spacing: -0.19px;
    font-weight: bold;
    color: var(--text-primary);
  }
  .u-username {
    color: var(--text-secondary);
    font-weight: 400;
  }
`;
const ReplyBtn = styled.a`
  font-size: var(--body3-size);
  line-height: var(--body3-line);
  color: var(--link-color);
  font-weight: 600;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentContent = styled.div`
  ${CommentContainer} > &:has(${ReplyContainer}) {
    border-left: 1px solid rgba(100, 113, 150, 0.1);
    @media (max-width: 767.98px) {
      border-left: none;
    }
  }
  padding-left: 52px;
  margin-left: 20px;
  @media (max-width: 767.98px) {
    padding-left: 0px;
    margin-left: 0px;
  }

  & .content-text {
    font-size: var(--body2-size);
    line-height: var(--body2-line);
    color: var(--text-secondary);
    font-weight: 400;
    @media (max-width: 767.98px) {
      font-size: var(--body3-size);
      line-height: var(--body3-line);
    }
  }
`;
const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
`;
