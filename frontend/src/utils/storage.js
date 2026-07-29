export function getData() {
  const data = localStorage.getItem('imperaCellData');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse imperaCellData', e);
    }
  }
  return { ordens: [] };
}
