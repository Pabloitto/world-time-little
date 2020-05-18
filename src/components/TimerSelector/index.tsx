import React from 'react';

// import moment from 'moment-timezone';

import './styles.scss';
import { TimeLineItem } from './TimeLineItem';

export const TimerSelector = ({
  timeLine,
  tz,
  currentDate
}: any) => {
  const renderTimeLine = () => {
    if (!timeLine) {
      return [];
    }
    return timeLine.reduce((acc: any[], timeSpan: number, i: number) => {
      acc.push((
        <TimeLineItem
          key={`${i}-${timeSpan}`}
          timeSpan={timeSpan}
          tz={tz}
          currentDate={currentDate}
        />
      ));
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