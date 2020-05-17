import React from 'react';

import moment from 'moment-timezone';

import './styles.scss';

export const TimerSelector = ({
  timeLine,
  tz,
  currentDate
}: any) => {
  const renderTimeLine = () => {
    return timeLine.reduce((acc: any[], timeStamp: number, i: number) => {
      const curr = moment(timeStamp).tz(tz);
      let hour = curr.format('h A').toLowerCase();
      let stateClass = `time-line-item-${hour.replace(' ', '')}`;
      if (hour === '12 am') {
        hour = currentDate.format('MMM DD');
        stateClass += ' start-of-day'
      } else if (hour === '11 pm'){
        stateClass += ' end-of-day';
      }
      acc.push(<div key={`${i}-${timeStamp}`} className={`time-line-item ${stateClass}`}>{hour}</div>);
      return acc;
    }, []);
  }

  return (
    <div className="timer-selector">
      <div className='time-line'>
        <div className='time-line-day'>
          {renderTimeLine()}
        </div>
      </div>
    </div>
  );
}