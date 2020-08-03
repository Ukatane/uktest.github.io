import React from 'react';

import { configure, shallow } from 'enzyme';
import Adaptar from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adaptar() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated ', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated ', () => {
    wrapper.setProps({
      isAuthenticated: true,
    });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it(' Here i am specifically checking if the LOGOUT is rendered when authenticated ', () => {
    wrapper.setProps({
      isAuthenticated: true,
    });
    expect(
      wrapper.contains(<NavigationItem href='/logout'> Logout </NavigationItem>)
    ).toEqual(true);
  });
});
