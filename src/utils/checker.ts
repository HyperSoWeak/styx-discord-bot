import { clientConfig } from '../config/index.ts';

export function isDeveloper(userId: string): boolean {
  return clientConfig.developers.some((dev) => dev.id === userId);
}
