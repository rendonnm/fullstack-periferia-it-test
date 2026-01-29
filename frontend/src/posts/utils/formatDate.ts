export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("es", {
    numeric: "auto",
    style: "narrow",
  });

  if (diffInSeconds < 60) {
    return rtf.format(0, "second");
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return rtf.format(-minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return rtf.format(-hours, "hour");
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return rtf.format(-days, "day");
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return rtf.format(-months, "month");
  }

  const years = Math.floor(months / 12);
  return rtf.format(-years, "year");
}
