import { StyleSheet } from 'react-native';

export const styleLessionItem = StyleSheet.create({
  safe: {
    backgroundColor: '#ffd0d6',
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  pressed: {
    opacity: 0.5,
  },
  header: {
    backgroundColor: '#990012',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
  },
});
