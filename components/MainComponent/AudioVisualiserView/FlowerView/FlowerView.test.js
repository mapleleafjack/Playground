import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { FlowerView } from './FlowerView';


test('renders the flower view with a default flower shape', () => {
    const { getByTestId } = render(<FlowerView flowerShape="flower" />);
    expect(getByTestId('flower-view')).toBeInTheDocument();
});