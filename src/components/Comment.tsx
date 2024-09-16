import React from "react";
import { Comment as CommentType } from "@/types/request";
import Reply from "./Reply";
import { CommentBase } from "./CommentBase";

const Comment: React.FC<{
  comment: CommentType;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}> = ({ comment, setComments }) => {
  const { replies, user, content, id } = comment;
  return (
    <CommentBase
      user={user}
      content={content}
      id={id}
      setComments={setComments}
    >
      {replies &&
        replies.map((reply) => <Reply key={reply.id} reply={reply} />)}
    </CommentBase>
  );
};
export default Comment;
