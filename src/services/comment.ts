import { Comment as CommentType, Reply } from "@/types/request";
import { db } from "@/config/firebase";
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
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
    return "Comment is deleted";
  } catch (error) {
    console.error(error);
  }
};

export const addReply = async (
  feedbackId: string,
  commentId: string,
  replyData: Omit<Reply, "id">
) => {
  const feedbackRef = doc(db, "Feedbacks", feedbackId);
  const commentDoc = doc(feedbackRef, "comments", commentId);
  try {
    const replyId = doc(collection(db, "temp")).id;
    const newReply: Reply = {
      id: replyId,
      ...replyData,
    };
    await updateDoc(commentDoc, {
      replies: arrayUnion(newReply),
    });

    return newReply;
  } catch (error) {
    console.error(error);
  }
};

export const deleteReply = async (
  feedbackId: string,
  commentId: string,
  replyId: string
) => {
  try {
    const commentRef = doc(db, "Feedbacks", feedbackId, "comments", commentId);
    const commentSnap = await getDoc(commentRef);
    const commentData = commentSnap.data();
    const replyToDelete = commentData?.replies.find(
      (reply: Reply) => reply.id === replyId
    );
    await updateDoc(commentRef, {
      replies: arrayRemove(replyToDelete),
    });
    console.log("Reply deleted successfully");
  } catch (error) {
    console.error(error);
  }
};
