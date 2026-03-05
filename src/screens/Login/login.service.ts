// services/login.service.ts

import { loginWithGoogle } from '../../services/auth.service';
import { UserService } from '../../services/todo.service';
import { AuthStorage } from '../../stores/auth.storage';
import { useUserStore } from '../../stores/user.store';
import { normalizeUser } from '../../utils/normalize-user';

class LoginService {
  async loginWithEmail(email: string, password: string) {
    const dbUser = await UserService.login(email, password)

    const appUser = normalizeUser({
      ...dbUser,
    });

    useUserStore.getState().setUser(appUser);
    await AuthStorage.saveUser(appUser);

    return appUser;
  }

  async loginWithGoogle() {
    const googleUser = await loginWithGoogle();

    if (!googleUser?.email) {
      throw new Error('GOOGLE_EMAIL_NOT_FOUND');
    }

    const isExists = await UserService.isEmailExists(googleUser.email);
    console.log('[Google Login] Email exists in DB:', isExists);

    // ===============================
    // CASE 1: USER ĐÃ TỒN TẠI
    // ===============================
    if (isExists) {
      const dbUser = await UserService.getByEmail(googleUser.email);
      if (!dbUser) throw new Error('USER_NOT_FOUND');

      console.log('[Google Login] DB User:', dbUser);

      const appUser = normalizeUser(dbUser);

      useUserStore.getState().setUser(appUser);
      await AuthStorage.saveUser(appUser);

      return {
        type: 'EXISTING_USER' as const,
        user: appUser,
      };
    }

    // ===============================
    // CASE 2: USER MỚI
    // ===============================
    const newUserPayload = {
      uid: googleUser.uid,
      avatar: googleUser.photoURL ?? '',
      name: googleUser.displayName ?? '',
      email: googleUser.email,
      phoneNumber: '',
      dateOfBirth: '',
    };

    console.log('[Google Login] NEW USER PAYLOAD:', newUserPayload);

    return {
      type: 'NEW_USER' as const,
      payload: newUserPayload,
    };
  }
}

export const loginService = new LoginService();
