// services/login.service.ts

import { loginWithGoogle } from "../../services/auth.service";
import { UserService } from "../../services/todo.service";
import { AuthStorage } from "../../stores/auth.storage";
import { useUserStore } from "../../stores/user.store";
import { normalizeUser } from "../../utils/normalize-user";

export class LoginService {
  static async loginWithEmail(email: string, password: string) {
    const dbUser = await UserService.login(email, password);
    const appUser = normalizeUser(dbUser);

    useUserStore.getState().setUser(appUser);
    await AuthStorage.saveUser(appUser);

    return appUser;
  }

  static async loginWithGoogle() {
    const googleUser = await loginWithGoogle();
    if (!googleUser?.email) {
      throw new Error('GOOGLE_EMAIL_NOT_FOUND');
    }
    const isExists = await UserService.isEmailExists(googleUser.email);

    if (isExists) {
      const dbUser = await UserService.getByEmail(googleUser.email);
      if (!dbUser) throw new Error('USER_NOT_FOUND');

      const appUser = normalizeUser(dbUser);
      useUserStore.getState().setUser(appUser);
      await AuthStorage.saveUser(appUser);

      return { type: 'EXISTING_USER' as const, user: appUser };
    }

    return {
      type: 'NEW_USER' as const,
      payload: {
        avatar: googleUser.photoURL ?? null,
        name: googleUser.displayName ?? '',
        email: googleUser.email,
        phoneNumber: null,
        dateOfBirth: null,
      },
    };
  }
}
