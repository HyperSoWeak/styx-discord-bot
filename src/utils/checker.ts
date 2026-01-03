import { AppConfig } from '../config/index.ts';

export function isDeveloper(userId: string): boolean {
  return AppConfig.developers.some((dev) => dev.id === userId);
}
