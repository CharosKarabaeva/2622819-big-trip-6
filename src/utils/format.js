const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit'
  }).toUpperCase();
};

const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDuration = (dateFrom, dateTo) => {
  const diff = new Date(dateTo) - new Date(dateFrom);

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const m = minutes % 60;
  const h = hours % 24;

  if (days > 0) {
    return `${days}D ${h}H ${m}M`;
  }

  if (hours > 0) {
    return `${hours}H ${m}M`;
  }

  return `${minutes}M`;
};

export {formatDate, formatTime, formatDuration};

function formatDateTime(date) {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export {formatDateTime};
