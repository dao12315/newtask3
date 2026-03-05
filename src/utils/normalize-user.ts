import { AppUser } from '../models/app-user';
import { User } from '../services/todo.service';

export const normalizeUser = (user: User): AppUser => ({
  uid: user.uid,
  name: user.name ?? null,
  email: user.email ?? null,
  avatar: user.avatar ?? null,
  phoneNumber: user.phoneNumber ? String(user.phoneNumber) : null,
  dateOfBirth: typeof user.dateOfBirth === 'number' ? user.dateOfBirth : null,
  status: user.status ?? true,
});
