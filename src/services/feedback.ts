import { db } from "@/config/firebase";
import {
  doc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  increment,
  getDocs,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { Request } from "@/types/request";
export const getFeedbacks = async () => {
  const feedbackCollectionRef = collection(db, "Feedbacks");
  const snapshot = await getDocs(feedbackCollectionRef);

  const feedbacks = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const feedbackData = doc.data();
      const commentsCollectionRef = collection(doc.ref, "comments");
      const commentsCount = await getCountFromServer(commentsCollectionRef);

      return {
        ...feedbackData,
        id: doc.id,
        commentCount: commentsCount.data().count,
      } as Request;
    })
  );
  return feedbacks;
};

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

      if (hasUpvoted) {
        transaction.update(feedbackRef, {
          upvotes: increment(-1),
          upvotedBy: arrayRemove(userId),
          hasUpvoted,
        });
        return {
          success: true,
          message: "Vote is added successfully",
        };
      } else {
        transaction.update(feedbackRef, {
          upvotes: increment(1),
          upvotedBy: arrayUnion(userId),
          hasUpvoted,
        });
        return {
          success: true,
          message: "Vote is removed successfully",
        };
      }
    });
    return result;
  } catch (err) {
    console.error("Error in upvote operation:", err);
  }
};
