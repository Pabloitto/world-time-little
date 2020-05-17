import React from 'react';

import { ActionButton } from '../ActionButton';
import { TextContentItem } from '../TextContentItem';
import { TimerSelector } from '../TimerSelector';

import './styles.scss';

export const TimeLineRow = ({
  place,
  index,
  handleHomeClick,
  handleTrashClick,
  handleNext
}: any) => {
  const {currentDate} = place;
  const hourWithZone = `${currentDate.format('hh:mm A').toLowerCase()} ${currentDate.zoneAbbr()}`;
  const hourWithDayName = currentDate.format('dd, MMM DD');

  const homeButtonProps:any = {}

  if (place.isDefault)  {
    homeButtonProps.icon = 'fa-home';
  } else {
    homeButtonProps.text = parseInt(currentDate.format('Z'), 10);
  }

  return (
    <div className="row">
      <div className="col-md-2">
        <div className="row">
          <div className="col-md-2">
            <ActionButton icon='fa-trash' onClick={() => handleTrashClick(index)} />
          </div>
          <div className="col-md-2">
            <ActionButton {...homeButtonProps}  withCircle onClick={() => handleHomeClick(index)} />
          </div>
          <div className="col-md-6">
            <TextContentItem text={place.city} subText={place.country} />
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <TextContentItem text={hourWithZone} subText={hourWithDayName} />
      </div>
      <div className="col-md-5 time-selector-container">
        <TimerSelector {...place} />
      </div>
      <div className="col-md-1">
        <ActionButton icon='fa-arrow-right' onClick={handleNext} />
      </div>
    </div>
  );
}