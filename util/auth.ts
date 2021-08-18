import { hash } from 'bcryptjs';

export async function hashPassword(password: string) {
  return await hash(password, 12);
}
