import { db } from "@/config/firebase";
import {
  doc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  increment,
} from "firebase/firestore";

export const upvoteFeedback = async (feedbackId: string, userId: string) => {
  const feedbackRef = doc(db, "Feedbacks", feedbackId);
  try {
    const result = await runTransaction(db, async (transaction) => {
      const feedbackDoc = await transaction.get(feedbackRef);
      if (!feedbackDoc.exists) {
        throw new Error("Feedback not found");
      }

      const upvotedBy = feedbackDoc.data()!.upvotedBy;
      const hasUpvoted = upvotedBy.includes(userId);

      if (hasUpvoted) {
        transaction.update(feedbackRef, {
          upvotes: increment(-1),
          upvotedBy: arrayRemove(userId),
        });
        return {
          success: true,
          message: "Vote is added successfully",
          hasUpvoted,
        };
      } else {
        transaction.update(feedbackRef, {
          upvotes: increment(1),
          upvotedBy: arrayUnion(userId),
        });
        return {
          success: true,
          message: "Vote is removed successfully",
          hasUpvoted,
        };
      }
    });
    return result;
  } catch (err) {
    console.error("Error in upvote operation:", err);
  }
};
