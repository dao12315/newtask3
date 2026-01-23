import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export async function loginWithGoogle() {
  try {
    // 1. Kiểm tra Google Play Services
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    // 2. Google Sign-In
    // await GoogleSignin.signOut();
    const signInResult = await GoogleSignin.signIn();
    if (!signInResult) {
      return null;
    }

    // 3. Lấy idToken (CÁCH ĐÚNG)
    const idToken = signInResult.data?.idToken;
    if (!idToken) {
      return null;
    }
    console.log('ID_TOKEN: ', idToken);

    // 4. Firebase credential
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // 5. Firebase login
    const userCredential = await auth().signInWithCredential(googleCredential);

    const { user } = userCredential;
    console.log(user);

    console.log('[Google Login] UID:', user.uid);
    console.log('[Google Login] Email:', user.email);

    return user;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User pressed cancel!');
      return null;
    }

    console.error(error);
    throw error;
  }
}
