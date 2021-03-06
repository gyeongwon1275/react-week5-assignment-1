import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RegionsContainer from './RegionsContainer';
import { regions } from './fixtures/mockData';
import { selectRegion } from './actions';

jest.mock('react-redux');

describe('RegionsContainer', () => {
  const dispatch = jest.fn();

  const initialState = {
    regions,
    error: { regions: null },
    selected: { regionName: null },
    loading: { regions: false },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useSelector.mockImplementationOnce((selector) => selector(initialState));
    useDispatch.mockImplementationOnce(() => dispatch);
  });

  it('gets regions when mounted', () => {
    render(<RegionsContainer />);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('renders regions', () => {
    const { getByRole } = render(<RegionsContainer />);

    regions.forEach((region) => {
      expect(getByRole('list')).toHaveTextContent(region.name);
    });
  });

  it('changes button text when clicked', () => {
    const { getByText } = render(<RegionsContainer />);
    const regionName = '울산';

    fireEvent.click(getByText(regionName));
    expect(dispatch).toHaveBeenCalledWith(selectRegion(regionName));
  });
});
