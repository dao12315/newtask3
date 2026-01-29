import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AuthStorage } from '../../../../stores/auth.storage';
import { useUserStore } from '../../../../stores/user.store';

class HeaderService {
  async logOut() {
    const { clearUser } = useUserStore.getState();

    await AuthStorage.clear();
    clearUser();

    const googleUser = GoogleSignin.getCurrentUser();
    if (googleUser) await GoogleSignin.signOut();
    if (auth().currentUser) await auth().signOut();
  }
}

export const headerService = new HeaderService();
