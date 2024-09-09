import { db } from "@/config/firebase";
import { getDocs, collection, getCountFromServer } from "firebase/firestore";
import { Request } from "@/types/request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data || "Failed to fetch Feedbacks"
        );
      } else {
        return err;
      }
    }
  }
);
