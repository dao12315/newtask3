// useLogin.ts
import { useEffect, useState } from 'react';
import { configureGoogleSignIn } from '../../config/googleAuth';
import { loginService } from './login.service';

export function useLogin() {
  const [hidden, setHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const loginWithEmail = async () => {
    if (!email || !password) {
      throw new Error('MISSING_CREDENTIALS');
    }

    await loginService.loginWithEmail(email, password);
  };

  const loginWithGoogle = async () => {
    return loginService.loginWithGoogle();
  };

  return {
    hidden,
    email,
    password,
    setHidden,
    setEmail,
    setPassword,
    loginWithEmail,
    loginWithGoogle,
  };
}
