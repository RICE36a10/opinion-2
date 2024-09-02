import { Comment } from "./comment";

export interface ProductRequest {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}
