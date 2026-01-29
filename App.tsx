import React, { useEffect } from 'react';
import Navigator from './src/routes/Navigator';
import { configureGoogleSignIn } from './src/config/googleAuth';
import { AuthStorage } from './src/stores/auth.storage';
import { useUserStore } from './src/stores/user.store';

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();
    (async () => {
      const user = await AuthStorage.getUser();
      useUserStore.getState().hydrate(user);
    })();
  }, []);

  return <Navigator />;
}
