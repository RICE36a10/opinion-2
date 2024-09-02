import { User } from "./user";

export interface Reply {
  id?: string;
  content: string;
  replyingTo: string;
  user: User;
}
