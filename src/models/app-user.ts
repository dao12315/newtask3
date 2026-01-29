export type AppUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: number | null; // ✅ timestamp
  status: boolean;
};
