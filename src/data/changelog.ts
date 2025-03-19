interface ChangelogEntry {
  version: string;
  date: string;
  description: string[];
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: 'v1.4.0',
    date: '2025-03-20',
    description: ['Added achievement leaderboard command.', 'Added pofang leaderboard command.'],
  },
  {
    version: 'v1.3.0',
    date: '2025-03-10',
    description: ['Added achievement system.', 'Added cf-rating command.', 'Fixed message count feature not working.'],
  },
  {
    version: 'v1.2.3',
    date: '2025-02-05',
    description: [
      'Added vote-simple command.',
      'Added github-contribution command.',
      'Fixed permission issues in some commands.',
      'Fixed bugs of the birthday celebration feature.',
      'Fixed bot crash due to expired interactions.',
    ],
  },
  {
    version: 'v1.2.2',
    date: '2025-02-03',
    description: [
      'Added birthday celebration feature.',
      'Added README.md and LICENSE file.',
      'Modified info commands.',
      'Refactored command interface for better command handling.',
      'Refactored code for better modularity.',
    ],
  },
  {
    version: 'v1.2.1',
    date: '2025-02-02',
    description: ['Switched to TypeScript for better type safety.', 'Fixed some typos in the code.'],
  },
  {
    version: 'v1.2.0',
    date: '2025-02-01',
    description: [
      'Added changelog command.',
      'Added server-settings command.',
      'Added user birthday settings.',
      'Added server timezone settings.',
      'Renamed some commands for consistency.',
      'Refactored code for better modularity.',
    ],
  },
  {
    version: 'v1.1.0',
    date: '2025-01-31',
    description: [
      'Added lyrics command.',
      'Added message relay feature.',
      'Added rhyme test feature.',
      'Modified message count feature.',
    ],
  },
  {
    version: 'v1.0.1',
    date: '2025-01-30',
    description: [
      'Added music bot feature.',
      'Added ntueat command.',
      'Added randint and choose commands.',
      'Added message count feature.',
      'Fixed bugs in the ping command.',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2025-01-28',
    description: [
      'Initial project setup with basic bot functionality.',
      'Added basic commands like ping, info, and server.',
      'Set up the project structure and configuration.',
    ],
  },
];

export default changelogEntries;
