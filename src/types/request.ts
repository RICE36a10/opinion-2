import { User } from "./user";
export interface Reply {
  id: string;
  content: string;
  replyingTo: string;
  user: User;
  createdAt: number;
}
export interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt: number;
  replies?: Reply[];
}
export interface CommentBaseProps {
  user: User;
  content: string;
  id: string;
  children?: React.ReactNode;
  replyingTo?: string;
  replyId?: string;
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
export const enum Status {
  Planned = "planned",
  Progress = "in-progress",
  Live = "live",
  Suggestion = "suggestion",
}
export const enum StatusColor {
  Planned = "#f49f85",
  Progress = "#ad1fea",
  Live = "#62bcfa",
}
