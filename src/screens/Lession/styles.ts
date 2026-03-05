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
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#b00020',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  close: {
    padding: 12,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
});
