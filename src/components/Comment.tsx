import React from "react";
import { Comment as CommentType } from "@/types/request";
import Reply from "./Reply";
import { CommentBase } from "./CommentBase";

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  const { replies, user, content } = comment;
  return (
    <CommentBase user={user} content={content}>
      {replies &&
        replies.map((reply) => <Reply key={reply.id} reply={reply} />)}
    </CommentBase>
  );
};
export default Comment;
