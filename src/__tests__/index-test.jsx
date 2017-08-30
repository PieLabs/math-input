import { assert, match, stub } from 'sinon';

import Keypad from '../keypad';
import { MathInput } from '../index';
import MathQuillInput from '../mathquill-input';
import React from 'react';
import debug from 'debug';
import { shallow } from 'enzyme';

const log = debug('test:math-input');
const defaultLatex = '1+1=2';

describe('math-input', () => {
  let wrapper, onLatexChange;

  beforeEach(() => {
    onLatexChange = stub();
    wrapper = shallow(<MathInput
      classes={{}}
      onLatexChange={onLatexChange}
      latex={`\\(${defaultLatex}\\)`} />);
  });

  test('sets latex', () => {
    const input = wrapper.find(MathQuillInput);
    const latex = input.props().latex;
    expect(latex).toEqual(defaultLatex);
  });

  test('adds brackets when calling props.onLatexChange', () => {
    const input = wrapper.find(MathQuillInput);
    const callback = input.props().onChange;
    callback(`2+2=4`);
    assert.calledWith(onLatexChange, '\\(2+2=4\\)');
  });

});
