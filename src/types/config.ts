export interface Developer {
  name: string;
  id: string;
}

export interface Config {
  version: string;
  developers: Developer[];
  testGuildId?: string;
  clientId: string;
}
