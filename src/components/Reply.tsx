import React from "react";
import { Reply as ReplyType } from "@/types/request";
import { CommentBase } from "./CommentBase";

const Reply: React.FC<{
  reply: ReplyType;
  commentId: string;
}> = ({ reply, commentId }) => {
  const { user, replyingTo, content, id } = reply;

  return (
    <CommentBase
      replyingTo={replyingTo}
      user={user}
      content={content}
      id={commentId}
      replyId={id}
    />
  );
};

export default Reply;
