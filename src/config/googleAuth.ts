import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId:
      '641808975808-5aq4oo6nthu5jnbp3i97lsaa87jsgoco.apps.googleusercontent.com',
    offlineAccess: false,
  });

}


