import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatDate = (date) => (
  dayjs(date).format('MMM DD').toUpperCase()
);

const formatTime = (date) => (
  dayjs(date).format('HH:mm')
);

const formatDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  const durationTime = dayjs.duration(diff);

  const days = durationTime.days();
  const hours = durationTime.hours();
  const minutes = durationTime.minutes();

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};

const formatDateTime = (date) => (
  dayjs(date).format('DD/MM/YY HH:mm')
);

export {
  formatDate,
  formatTime,
  formatDuration,
  formatDateTime
};
