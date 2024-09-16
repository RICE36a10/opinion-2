import React from "react";
import { Comment as CommentType } from "@/types/request";
import Reply from "./Reply";
import { CommentBase } from "./CommentBase";

const Comment: React.FC<{
  comment: CommentType;
}> = ({ comment }) => {
  const { replies, user, content, id } = comment;
  return (
    <CommentBase user={user} content={content} id={id}>
      {replies &&
        replies.map((reply) => (
          <Reply key={reply.id} reply={reply} commentId={id} />
        ))}
    </CommentBase>
  );
};
export default Comment;
