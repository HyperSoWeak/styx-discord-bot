export function getFormattedDate(date) {
  return new Date(date).toISOString().split('T')[0];
}
