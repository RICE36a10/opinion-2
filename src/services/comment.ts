import { Comment as CommentType, Reply } from "@/types/request";
import { db } from "@/config/firebase";
import { doc, collection, addDoc, deleteDoc } from "firebase/firestore";
export const addComment = async (
  feedbackId: string,
  commentData: Omit<CommentType, "id">
) => {
  const feedbackRef = doc(db, "Feedbacks", feedbackId);
  const commentsRef = collection(feedbackRef, "comments");
  try {
    const newCommentRef = await addDoc(commentsRef, commentData);
    return {
      id: newCommentRef.id,
      ...commentData,
    } as CommentType;
  } catch (error) {
    console.error(error);
  }
};
export const deleteComment = async (feedbackId: string, commentId: string) => {
  const feedbackRef = doc(db, "Feedbacks", feedbackId);
  const commentDoc = doc(feedbackRef, "comments", commentId);
  try {
    await deleteDoc(commentDoc);
    return "Feedback deleted";
  } catch (error) {
    console.error(error);
  }
};

export const addReply = async (
  feedbackId: string,
  commentId: string,
  replyData: Reply
) => {};
