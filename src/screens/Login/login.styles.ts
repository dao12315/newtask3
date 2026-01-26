import { StyleSheet } from "react-native";

export const stylesLogin = StyleSheet.create({
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

  form: {
    paddingHorizontal: 35,
    paddingVertical: 20,
    gap: 10,
  },

  welcome: {
    fontSize: 24,
    fontWeight: '500',
  },

  brand: {
    color: '#990012',
    fontSize: 30,
    fontWeight: '900',
    height: 100,
  },

  group: {
    gap: 8,
  },

  label: {
    fontSize: 18,
    fontWeight: '500',
  },

  inputWrapper: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#fed1d6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
    color: '#990012',
  },

  inputAbsolute: {
    position: 'absolute',
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
    color: '#990012',
  },

  eyeIcon: {
    position: 'absolute',
    right: 16,
  },

  forgot: {
    alignItems: 'flex-end',
    height: 40,
  },

  forgotText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#990012',
  },

  loginBtnWrap: {
    alignItems: 'center',
  },

  loginBtn: {
    width: 200,
    height: 50,
    backgroundColor: '#990012',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#CFCFCF',
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666',
  },

  social: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 20,
  },

  socialBtn: {
    flex: 1,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#990012',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIconFb: {
    position: 'absolute',
    left: 10,
    width: 35,
    height: 35,
  },

  socialIconGg: {
    position: 'absolute',
    left: 12,
    width: 30,
    height: 30,
  },

  socialText: {
    fontSize: 16,
    color: '#000',
  },

  register: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },

  registerText: {
    color: '#990012',
    fontWeight: '500',
  },
});