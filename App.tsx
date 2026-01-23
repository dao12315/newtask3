import React, { useEffect } from 'react';
import Navigator from './src/routes/Navigator';
import { configureGoogleSignIn } from './src/config/googleAuth';

export default function App() {
  // useEffect(() => {
  //   configureGoogleSignIn();
  // }, []);
  return <Navigator />;
}
