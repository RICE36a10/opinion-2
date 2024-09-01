export interface User {
  image: string;
  name: string;
  username: string;
}
export interface UserState {
  user: {
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    name: string;
    picture: string;
    verified_email: boolean;
  } | null;
  error: string | null;
}
