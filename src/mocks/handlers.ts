// src/mocks/handlers.js
import { BASE_URL } from "../utils/constants/baseUrl";
import { http, HttpResponse } from "msw";
import { ProductRequest } from "../types/productRequest";
import { Comment } from "../types/comment";
import { Reply } from "../types/reply";
import { FeedbackData } from "@/utils/constants/FeedbackData";
const STORAGE_KEY: string = "FeedbackData";

const localData: string | null = localStorage.getItem(STORAGE_KEY);
const initialData: ProductRequest[] = localData
  ? JSON.parse(localData)
  : FeedbackData;

const allRequests = new Map<string, ProductRequest>();

initialData.forEach((request) => {
  allRequests.set(request.id.toString(), request);
});
interface UpvoteData {
  upvote: number;
  hasUserUpvote: boolean;
}
const saveToLocalStorage = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(Array.from(allRequests.values()))
  );
};

export const handlers = [
  http.get(`${BASE_URL}/product-requests`, () => {
    return HttpResponse.json(Array.from(allRequests.values()));
  }),
  http.post(`${BASE_URL}/product-requests`, async ({ request }) => {
    const newFeedback: ProductRequest =
      (await request.json()) as ProductRequest;
    allRequests.set(newFeedback.id.toString(), newFeedback);
    return HttpResponse.json(newFeedback, { status: 201 });
  }),
  http.post(
    `${BASE_URL}/product-request/:id/comments`,
    async ({ params, request }) => {
      const { id } = params;
      const newComment: Comment = (await request.json()) as Comment;
      const productRequest = allRequests.get(id as string);
      if (!productRequest) {
        return new HttpResponse(null, { status: 404 });
      }
      if (!productRequest.comments) {
        productRequest.comments = [];
      }
      newComment.id = `${productRequest.comments.length + 1}`;
      allRequests.set(id as string, productRequest);
      return HttpResponse.json(productRequest, { status: 201 });
    }
  ),
  http.post(
    `${BASE_URL}/product-requests/:requestId/comments/:commentId/replies`,
    async ({ request, params }) => {
      const { requestId, commentId } = params;
      const newReply: Reply = (await request.json()) as Reply;
      const productRequest = allRequests.get(requestId as string);
      if (!productRequest) {
        return new HttpResponse(null, { status: 404 });
      }
      const comment: Comment = productRequest.comments?.find(
        (c) => c.id === (commentId as string)
      ) as Comment;
      if (!comment) {
        return new HttpResponse(null, { status: 404 });
      }
      if (!comment.replies) {
        comment.replies = [];
      }

      newReply.id = `${comment.replies.length + 1}`;
      comment.replies.push(newReply);

      allRequests.set(requestId as string, productRequest);
      return HttpResponse.json(productRequest, { status: 201 });
    }
  ),

  http.delete(`${BASE_URL}/product-requests/:id`, async ({ params }) => {
    const { id } = params;
    const deletedPost = allRequests.get(id as string);
    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 });
    }
    allRequests.delete(id as string);
    return HttpResponse.json(deletedPost);
  }),
  http.patch(
    `${BASE_URL}/product-requests/:id`,
    async ({ request, params }) => {
      const { id } = params;
      const updatedRequest = (await request.json()) as ProductRequest;
      allRequests.set(id as string, updatedRequest);
      return HttpResponse.json(updatedRequest);
    }
  ),
  http.patch(
    `${BASE_URL}/product-requests/:id/upvote`,
    async ({ params, request }) => {
      try {
        const { id } = params;
        const { upvote, hasUserUpvote } = (await request.json()) as UpvoteData;
        const productRequest = allRequests.get(id as string);
        if (!productRequest) {
          return new HttpResponse(null, { status: 404 });
        }
        if (upvote && !hasUserUpvote) {
          productRequest.upvotes = productRequest.upvotes + 1;
        } else if (upvote! && !hasUserUpvote) {
          productRequest.upvotes = productRequest.upvotes - 1;
        }

        allRequests.set(id as string, productRequest);
        saveToLocalStorage();
        return HttpResponse.json(null, { status: 204 });
      } catch (error) {
        return HttpResponse.json({
          message: "Internal server error",
          status: 500,
        });
      }
    }
  ),

  http.get(`${BASE_URL}/product-requests/:id`, ({ params }) => {
    const { id } = params;
    const getRequest = allRequests.get(id as string);
    if (!getRequest) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(getRequest);
  }),
  http.get(`${BASE_URL}/user`, () => {
    return HttpResponse.json({
      image: "./assets/user-images/image-zena.jpg",
      name: "Zena Kelley",
      username: "velvetround",
    });
  }),
];
