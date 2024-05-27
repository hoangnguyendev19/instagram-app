import moment from 'moment';

const FormatTimestamp = (timestamp) => {
  const now = moment();
  const then = moment(timestamp);

  const secondsDiff = now.diff(then, 'seconds');

  if (secondsDiff < 60) {
    return secondsDiff + ' seconds ago';
  } else if (secondsDiff < 3600) {
    const minutesDiff = now.diff(then, 'minutes');
    return minutesDiff + ' minutes ago';
  } else if (secondsDiff < 86400) {
    const hoursDiff = now.diff(then, 'hours');
    return hoursDiff + ' hours ago';
  } else {
    const daysDiff = now.diff(then, 'days');
    return daysDiff + ' days ago';
  }
};

export default FormatTimestamp;
