import React from 'react';
import { render } from '@testing-library/react';
import { TextContentItem } from '..';

describe('<TextContentItem />', () => {
  it('should render text content item with correct title and sub-title', () => {
    const { getByText } = render(<TextContentItem text='City' subText='Country' />);
    const city = getByText(/City/i);
    expect(city).toBeInTheDocument();
    const country = getByText(/Country/i);
    expect(country).toBeInTheDocument();
  });
});