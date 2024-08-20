import { User } from "./user";
import { Reply } from "./reply";

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}
