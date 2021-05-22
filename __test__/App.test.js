
import React from 'react';
import { render } from '@testing-library/react-native'

let component;
import App from '../App';

describe('<App />', () => {
    beforeEach(() => {
        component = render(<App />)
    })

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
    })
});