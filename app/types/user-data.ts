export type UserDataType = {
  id: number;
  username: string;
  email: string;
  phone: string;
  image_url?: string;
  password?: string;
};

export type UserContextType = {
  user: UserDataType | null;
  setUser: (user: UserDataType | null) => void;
};
