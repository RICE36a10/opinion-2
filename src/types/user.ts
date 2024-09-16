export interface User {
  image: string;
  name: string;
  username: string;
  uid: string;
}

export interface authUser {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  providerId: string;
}
export interface UserState {
  user: authUser | null;
  error: string | null;
}
