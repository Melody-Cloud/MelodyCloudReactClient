import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppRouting from '../src/components/AppRouting';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

describe('App', () => {
    test('should render', () => {
        const app = mount(<AppRouting/>);
        expect(app.text()).toContain('MelodyCloud');
    });
});
