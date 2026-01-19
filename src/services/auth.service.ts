import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function loginWithGoogle() {
  try {
    // 1. Kiểm tra Google Play Services
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    // 2. Google Sign-In
    // const signOut = await GoogleSignin.signOut();
    const signInResult = await GoogleSignin.signIn();

    // 3. Lấy idToken (CÁCH ĐÚNG)
    const idToken = signInResult.data?.idToken ?? signInResult.data?.idToken;
    console.log(idToken);
    if (!idToken) {
      throw new Error('Google Sign-In failed: No ID Token');
    }

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
    console.error(error);

    throw error;
  }
}
