import database from '@react-native-firebase/database';

export const testFirebaseConnection = async () => {
  try {
    // Test write
    await database().ref('/test').push({
      message: 'Firebase OK',
      timestamp: new Date().toISOString(),
    });

    console.log('✓ Firebase connection successful - Write OK');

    // Test read
    const snapshot = await database().ref('/test').once('value');
    console.log('✓ Firebase read successful:', snapshot.val());

    return true;
  } catch (error) {
    console.error('✗ Firebase connection failed:', error);
    return false;
  }
};
