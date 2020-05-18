import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import moment from 'moment-timezone';

import { TimeLineRow } from '..';
import { TimeLineBuilder } from '../../../utils/TimeLineBuilder';

const timeLineBuilder = new TimeLineBuilder();

describe('<TimeLineRow />', () => {
  it('should render time line row correctly when is default', () => {
    const [firstPlace] = timeLineBuilder.attachTimeLines([
      {
        isDefault: true,
        tz: 'America/Hermosillo',
        country: 'Mexico',
        city: 'Hermosillo',
        currentDate: moment('1985-10-26').set({
          hours: 13
        }).tz('America/Hermosillo')
      }
    ]);
    const handleHomeClick = jest.fn();
    const handleTrashClick = jest.fn();
    const handleNext = jest.fn();
    const { getByText, getAllByText } = render((
      <TimeLineRow
        place={firstPlace}
        index={0}
        handleHomeClick={handleHomeClick}
        handleTrashClick={handleTrashClick}
        handleNext={handleNext}
      />
    ));
    expect(getAllByText(/Oct 26/i)).toHaveLength(2);
    expect(getByText(/Hermosillo/i)).toBeInTheDocument();
    expect(getByText(/Mexico/i)).toBeInTheDocument();
  });

  it('should render time line row correctly when is not default', () => {
    const [, secondPlace] = timeLineBuilder.attachTimeLines([
      {
        isDefault: true,
        tz: 'America/Hermosillo',
        country: 'Mexico',
        city: 'Hermosillo',
        currentDate: moment('1985-01-01').set({
          hours: 13
        }).tz('America/Hermosillo')
      },
      {
        isDefault: false,
        tz: 'America/Mexico_City',
        country: 'Mexico',
        city: 'CDMX',
        currentDate: moment('1985-01-01').set({
          hours: 13
        }).tz('America/Mexico_City')
      }
    ]);
    const handleHomeClick = jest.fn();
    const handleTrashClick = jest.fn();
    const handleNext = jest.fn();
    const { getByText, getAllByText } = render((
      <TimeLineRow
        place={secondPlace}
        index={0}
        handleHomeClick={handleHomeClick}
        handleTrashClick={handleTrashClick}
        handleNext={handleNext}
      />
    ));
    expect(getAllByText(/Jan 01/i)).toHaveLength(2);
    expect(getByText(/CDMX/i)).toBeInTheDocument();
    expect(getByText(/Mexico/i)).toBeInTheDocument();
  });

  it('should handle every event for buttons correctly', () => {
    const [firstPlace] = timeLineBuilder.attachTimeLines([
      {
        isDefault: true,
        tz: 'America/Hermosillo',
        country: 'Mexico',
        city: 'Hermosillo',
        currentDate: moment('1985-01-01').set({
          hours: 13
        }).tz('America/Hermosillo')
      }
    ]);
    const handleHomeClick = jest.fn();
    const handleTrashClick = jest.fn();
    const handleNext = jest.fn();
    const { container } = render((
      <TimeLineRow
        place={firstPlace}
        index={0}
        handleHomeClick={handleHomeClick}
        handleTrashClick={handleTrashClick}
        handleNext={handleNext}
      />
    ));
    const homeButton = container.querySelector('.fa-home');
    if (homeButton) {
      fireEvent.click(homeButton);
    }
    expect(handleHomeClick).toHaveBeenCalledTimes(1);

    const trashButton = container.querySelector('.fa-trash');
    if (trashButton) {
      fireEvent.click(trashButton);
    }
    expect(handleHomeClick).toHaveBeenCalledTimes(1);
  });
});