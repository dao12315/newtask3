import { StyleSheet } from "react-native";


export const stylesHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffd0d6',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  avatarWrapper: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#a99195',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
  },

  editAvatarBtn: {
    position: 'absolute',
    right: -5,
    bottom: -3,
    width: 24,
    height: 24,
    borderRadius: 13,
    backgroundColor: '#beb4b4ff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hello: {
    color: '#dc4a4aff',
  },

  right: {
    flexDirection: 'row',
    gap: 5,
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: '#a99195',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },

  pressed: {
    opacity: 0.3,
  },
});
