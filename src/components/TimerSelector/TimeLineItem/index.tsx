import React from 'react';
import moment from 'moment-timezone';

export const TimeLineItem = ({
  timeSpan,
  tz,
  currentDate
}: any) => {
  const date = moment(timeSpan).tz(tz);

  let hour = date.format('h A').toLowerCase();
  
  let stateClass = `time-line-item-${hour.replace(' ', '')}`;

  if (hour === '12 am') {
    hour = currentDate.format('MMM DD');
    stateClass += ' start-of-day'
  } else if (hour === '11 pm') {
    stateClass += ' end-of-day';
  }

  return (
    <div className={`time-line-item ${stateClass}`}>
      {hour}
    </div>
  );
}
