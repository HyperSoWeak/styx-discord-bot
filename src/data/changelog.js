const changelogEntries = [
  {
    version: 'v1.2.3',
    date: '2025-01-15',
    description: [
      'Added /set-timezone command to configure server timezone.',
      'Fixed minor UI bugs in the settings page.',
      'Improved time zone handling.',
    ],
  },
  {
    version: 'v1.2.2',
    date: '2025-01-10',
    description: [
      'Fixed bugs with user birthday handling.',
      'Now users can set and clear their birthday correctly.',
      'Added error handling for invalid date inputs.',
    ],
  },
  {
    version: 'v1.2.1',
    date: '2025-01-05',
    description: [
      'Improved error handling and logging.',
      'Better error messages for server settings commands.',
      'Optimized database queries.',
    ],
  },
  {
    version: 'v1.2.0',
    date: '2025-01-01',
    description: [
      'Initial release with basic server settings and user profile features.',
      'Added support for birthday setting.',
      'Initial version of the changelog command.',
    ],
  },
];

export default changelogEntries;
