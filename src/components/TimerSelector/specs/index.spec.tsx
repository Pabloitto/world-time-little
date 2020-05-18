import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment-timezone';

import { TimerSelector } from '..';
import { TimeLineBuilder } from '../../../utils/TimeLineBuilder';

const timeLineBuilder = new TimeLineBuilder();

describe('<TimerSelector />', () => {
  it('should render without timeline', () => {
    const { container } = render(<TimerSelector />);
    const timeLineContainer = container.querySelector('.time-line-day');
    expect(timeLineContainer?.children).toHaveLength(0);
  });

  it('should render multiple items inside the timeline', () => {
    const [firstPlace] = timeLineBuilder.attachTimeLines([
      {
        isDefault: true,
        tz: 'America/Hermosillo',
        country: 'Mexico',
        city: 'Hermosillo',
        currentDate: moment('1885-09-02').tz('America/Hermosillo')
      }
    ]);
    const { container } = render(<TimerSelector {...firstPlace} />);
    const items = container.querySelectorAll('.time-line-item');
    expect(items).toHaveLength(24);
  });
});