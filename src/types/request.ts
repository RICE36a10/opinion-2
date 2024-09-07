export interface Request {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentCount: number;
  upvotedBy: string[];
}
