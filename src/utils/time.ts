export function getFormattedDate(date?: Date | string | null): string {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
}
