import React from "react";
import { Reply as ReplyType } from "@/types/request";
import { CommentBase } from "./CommentBase";
const Reply: React.FC<{ reply: ReplyType }> = ({ reply }) => {
  const { user, replyingTo, content } = reply;

  return <CommentBase replyingTo={replyingTo} user={user} content={content} />;
};

export default Reply;
