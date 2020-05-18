import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ActionButton } from '..';

describe('<ActionButton />', () => {
  it('should render action button with correct text content when text is specified', () => {
    const { getByText } = render(<ActionButton text='test render' />);
    const textElement = getByText(/test render/i);
    expect(textElement).toBeInTheDocument();
  });
  it('should render action button with icon content when icon prop is specified', () => {
    const { container } = render(<ActionButton icon='fa-home' />);
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
  });
  it('should render null content when text nor icon props are specified', () => {
    const { container } = render(<ActionButton />);
    expect(container.querySelectorAll('div')).toHaveLength(1);
    expect(container.querySelectorAll('span')).toHaveLength(0);
    expect(container.querySelectorAll('i')).toHaveLength(0);
  });
  it('should render action button without circle wrap when withCircle prop is not specified', () => {
    const { container } = render(<ActionButton icon='fa-home' />);
    const content = container.querySelector('div.action-button-circle-wrap');
    expect(content).not.toBeInTheDocument();
  });
  it('should render action button with circle wrap when withCircle prop is specified', () => {
    const { container } = render(<ActionButton icon='fa-home' withCircle />);
    const content = container.querySelector('div.action-button-circle-wrap');
    expect(content).toBeInTheDocument();
  });
  it('should execute on click as a callback  when on click prop is specified', () => {
    const onClick = jest.fn();
    const { container } = render(<ActionButton icon='fa-home' onClick={onClick} />);
    const actionButton = container.querySelector('div.action-button');
    if (actionButton) {
      fireEvent.click(actionButton);
    }
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});