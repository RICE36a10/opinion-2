import { User } from "./user";

export interface Reply {
  id?: number;
  content: string;
  replyingTo: string;
  user: User;
}
