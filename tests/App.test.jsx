import React from 'react';
import AppRouting from '../src/components/AppRouting';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  test('should render', () => {
    const app = mount(<AppRouting />);
    expect(app.text()).toContain('Hello World!');
  });
});
