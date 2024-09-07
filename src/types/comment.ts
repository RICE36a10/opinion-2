import { User } from "./user";
import { Reply } from "./reply";

export interface Comment {
  id: string;
  content: string;
  user?: User;
  replies?: Reply[];
}
