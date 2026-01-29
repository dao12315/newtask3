import { AppUser } from "../models/app-user";
import { User } from "../services/todo.service";

export const normalizeUser = (user: User): AppUser => ({
    id: user.id,
    name: user.name ?? null,
    email: user.email ?? null,
    avatar: user.avatar ?? null,
    phoneNumber: user.phoneNumber ? String(user.phoneNumber) : null,
    dateOfBirth:
      user.dateOfBirth instanceof Date
        ? user.dateOfBirth.getTime()
        : typeof user.dateOfBirth === 'number'
        ? user.dateOfBirth
        : null,
    status: user.status ?? true,
  });
