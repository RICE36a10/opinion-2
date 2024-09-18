import { db } from "@/config/firebase";
import {
  doc,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  runTransaction,
  increment,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { Comment, SingleRequest } from "@/types/request";

export const upvoteFeedback = async (feedbackId: string, userId: string) => {
  const feedbackRef = doc(db, "Feedbacks", feedbackId);
  try {
    const result = await runTransaction(db, async (transaction) => {
      const feedbackDoc = await transaction.get(feedbackRef);
      if (!feedbackDoc.exists) {
        throw new Error("Feedback not found");
      }

      const upvotedBy = feedbackDoc.data()!.upvotedBy || [];
      const hasUpvoted = upvotedBy.includes(userId);

      transaction.update(feedbackRef, {
        upvotes: hasUpvoted ? increment(-1) : increment(1),
        upvotedBy: hasUpvoted ? arrayRemove(userId) : arrayUnion(userId),
        hasUpvoted: !hasUpvoted,
      });
      return {
        success: true,
        message: hasUpvoted
          ? "Vote is removed successfully"
          : "Vote is added successfully",
        hasUpvoted,
      };
    });
    return result;
  } catch (err) {
    console.error("Error in upvote operation:", err);
  }
};
export const getFeedbackById = async (feedbackId: string) => {
  const feedbackRef = doc(db, "Feedbacks", feedbackId);
  const feedbackDoc = await getDoc(feedbackRef);
  if (!feedbackDoc.exists()) {
    throw new Error("Feedback not found");
  }
  const feedbackData = feedbackDoc.data();
  const commentsRef = collection(feedbackRef, "comments");
  const commentsQuery = query(commentsRef, orderBy("createdAt", "asc"));
  const commentsSnapshot = await getDocs(commentsQuery);

  const comments: Comment[] = [];
  commentsSnapshot.forEach((doc) => {
    comments.push({
      id: doc.id,
      ...doc.data(),
    } as Comment);
  });
  return {
    id: feedbackDoc.id,
    ...feedbackData,
    comments,
    commentCount: comments.length,
  } as SingleRequest;
};
