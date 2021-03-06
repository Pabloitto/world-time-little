import React from 'react';
import moment from 'moment-timezone';

import { render } from '@testing-library/react';
import { TimeLineItem } from '..';

describe('<TimeLineItem />', () => {
  it('should render 3 pm timeline item', () => {
    const currentDay = '2015-10-21';
    const currentHour = 17;
    const today = moment(currentDay).tz('America/Hermosillo');
    const timeSpan = today.clone().tz('America/Hermosillo').set({ hours: currentHour }).valueOf();
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

  it('should render current day as end day timeline item', () => {
    const currentDay = '1955-11-12';
    const currentHour = 23;
    const today = moment(currentDay).tz('America/Hermosillo').set({ hours: currentHour });
    const timeSpan = today.clone().tz('America/Hermosillo').set({ hours: currentHour }).valueOf();

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