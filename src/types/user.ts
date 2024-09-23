export interface User {
  image: string;
  name: string;
  username: string;
  uid: string;
}

export interface authUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
  providerId: string;
}
export interface UserState {
  user: authUser | null;
  error: string | null;
}
