import React from 'react';

import { configure, shallow } from 'enzyme';
import Adaptar from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adaptar() });

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initialIngredients={() => {}} />);
  });

  it('should render <BuildControls /> only when we have ingredients', () => {
    wrapper.setProps({
      ingredients: {},
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
