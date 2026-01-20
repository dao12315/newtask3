import bcrypt from 'bcryptjs';

bcrypt.setRandomFallback((len: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 256));
  }
  return arr;
});

const SALT_ROUNDS = 10;

export async function hasPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
