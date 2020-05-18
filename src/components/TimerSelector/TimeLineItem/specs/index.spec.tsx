import React from 'react';
import moment from 'moment-timezone';

import { render } from '@testing-library/react';
import { TimeLineItem } from '..';

describe('<TimeLineItem />', () => {
  it('should render 3 pm timeline item', () => {
    const currentDay = '2015-10-21';
    const currentHour = 17;
    const today = moment(currentDay);
    const timeSpan = today.clone().set({ hours: currentHour }).valueOf();
    const { getByText } = render((
      <TimeLineItem
        timeSpan={timeSpan}
        tz='America/Hermosillo'
        currentDate={today}
      />
    ));
    const textElement = getByText(/5 pm/i);
    expect(textElement).toBeInTheDocument();
  });

  it('should render next day name when 12 am is present as timeline item', () => {
    const currentDay = '1955-11-05';
    const currentHour = 24;
    const today = moment(currentDay).set({ hours: currentHour });
    const timeSpan = today.clone().set({ hours: currentHour }).valueOf();

    const { getByText } = render((
      <TimeLineItem
        timeSpan={timeSpan}
        tz='America/Hermosillo'
        currentDate={today}
      />
    ));
    const textElement = getByText(/Nov 06/i);
    expect(textElement).toBeInTheDocument();
  });

  it('should render next day name when 12 am is present as timeline item', () => {
    const currentDay = '1955-11-05';
    const currentHour = 24;
    const today = moment(currentDay).set({ hours: currentHour });
    const timeSpan = today.clone().set({ hours: currentHour }).valueOf();

    const { container, getByText } = render((
      <TimeLineItem
        timeSpan={timeSpan}
        tz='America/Hermosillo'
        currentDate={today}
      />
    ));
    const textElement = getByText(/Nov 06/i);
    expect(textElement).toBeInTheDocument();
    expect(container.querySelector('.start-of-day')).toBeInTheDocument();
  });

  it('should render current day as end day timeline item', () => {
    const currentDay = '1955-11-12';
    const currentHour = 23;
    const today = moment(currentDay).set({ hours: currentHour });
    const timeSpan = today.clone().set({ hours: currentHour }).valueOf();

    const { container, getByText } = render((
      <TimeLineItem
        timeSpan={timeSpan}
        tz='America/Hermosillo'
        currentDate={today}
      />
    ));
    const textElement = getByText(/11 pm/i);
    expect(textElement).toBeInTheDocument();
    expect(container.querySelector('.end-of-day')).toBeInTheDocument();
  });
});