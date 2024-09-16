import { User } from "./user";
import { Timestamp } from "firebase/firestore";
export interface Reply {
  id: string;
  content: string;
  replyingTo: string;
  user: User;
  createdAt: Timestamp;
}
export interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt: Timestamp;
  replies?: Reply[];
}
export interface CommentBaseProps {
  user: User;
  content: string;
  id: string;
  children?: React.ReactNode;
  replyingTo?: string;
}
export interface Request {
  id: string;
  commentCount: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  upvotedBy: string[];
  authorId: string;
}
export interface SingleRequest extends Request {
  comments: Comment[];
}
export enum sortByOrder {
  ASC_UPVOTES = "ascUpvotes",
  DESC_UPVOTES = "descUpvotes",
  ASC_COMMENTS = "ascComments",
  DESC_COMMENTS = "descComments",
}
export interface FeedbackState {
  feedbackData: Request[];
  loading: boolean;
  error: null | string;
}
export type sortOptions = { name: string; id: sortByOrder }[];

export interface FilterState {
  sortBy: { name: string; id: sortByOrder };
  filterByCategory: string;
}
