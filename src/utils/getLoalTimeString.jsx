export default function getLocalTimeString(timestamp) {
  const milliseconds =
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const month = date.getMonth() + 1; // Adding 1 since months are zero-based (0 for January)
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
