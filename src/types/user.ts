export interface User {
  image: string;
  name: string;
  username: string;
}

export interface authUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
  providerId: string | null;
  phoneNumber: string | null;
}
export interface UserState {
  user: authUser | null;
  error: string | null;
}
