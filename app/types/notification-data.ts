export type NotificationType = {
  id: number;
  user_id: number;
  feedback_id?: null;
  message: string;
  is_read?: boolean;
  created_at: string;
  title: string;
};
