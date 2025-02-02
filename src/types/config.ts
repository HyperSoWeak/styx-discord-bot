export interface Developer {
  name: string;
  id: string;
}

export interface Config {
  version: string;
  developers: Developer[];
  testGuildId: string;
  client: {
    id: string;
    testId: string;
  };
}
