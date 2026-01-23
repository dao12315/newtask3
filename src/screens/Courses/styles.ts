import { StyleSheet } from "react-native";

export const stylesCourse = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffd0d6',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 16,
    height: 80,
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },

  list: {
    padding: 10,
    gap: 16,
  },
});