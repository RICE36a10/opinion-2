import React, { useState } from "react";
import styled from "styled-components";
import { CommentBaseProps } from "@/types/request";
import PostReply from "./PostReply";
export const CommentBase: React.FC<CommentBaseProps> = ({
  user,
  content,
  children,
  replyingTo,
}) => {
  const [replying, setReplying] = useState(false);
  const onReply = () => {
    setReplying((prev) => !prev);
  };
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
        <ReplyBtn onClick={onReply}>Reply</ReplyBtn>
      </UserContent>
      <CommentContent>
        <p className="content-text">
          {replyingTo ? <span className="replyTo">@{replyingTo} </span> : ""}
          {content}
        </p>
        {replying && <PostReply setReplying={setReplying} />}
        {children}
      </CommentContent>
    </>
  );
  return replyingTo ? (
    <ReplyContainer>{Content}</ReplyContainer>
  ) : (
    <CommentContainer>{Content}</CommentContainer>
  );
};

export const ReplyContainer = styled.div`
  padding-top: 32px;
  .replyTo {
    font-weight: bold;
    color: var(--button-color);
  }
`;
const CommentContainer = styled.div`
  padding-bottom: 32px;
  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(140, 146, 179, 0.25);
  }
  &:not(:first-of-type) {
    padding-top: 32px;
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
  img {
    width: 100%;
  }
`;
const UserInfo = styled.div`
  margin-right: auto;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
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
  }
  padding-left: 52px;
  margin-left: 20px;

  & .content-text {
    font-size: var(--body2-size);
    line-height: var(--body2-line);
    color: var(--text-secondary);
    font-weight: 400;
  }
`;
