export type UserDataType = {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
  phone: string;
  role: string;
  created_at: string;
};

export type UserContextType = {
  user: UserDataType | null;
  setUser: (user: UserDataType | null) => void;
};
