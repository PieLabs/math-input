import { assert, match, stub, useFakeTimers } from 'sinon';
import { mathField, resetMocks } from '../../__mocks__/mathquill-mock.js';

import Keypad from '../keypad';
import { MathInput } from '../index';
import MathQuillInput from '../mathquill-input';
import React from 'react';
import debug from 'debug';
import { shallow } from 'enzyme';

const log = debug('test:math-input');
const defaultLatex = '1+1=2';

let clock;

beforeAll(() => {
  clock = useFakeTimers();
});
afterAll(() => {
  clock.restore();
});

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


  describe('onClick', () => {
    let mq;

    beforeEach(() => {
      mq = {
        command: stub(),
        keystroke: stub(),
        write: stub()
      }
      wrapper.instance().mq = mq;
    });

    test('handles clear', () => {
      wrapper.instance().onClick({ value: 'clear' });
      assert.calledWith(onLatexChange, '');
    });

    test('handles command', () => {
      wrapper.instance().onClick({ type: 'command', value: 'cmd' });
      assert.calledWith(mq.command, 'cmd');
    });

    test('handles cursor', () => {
      wrapper.instance().onClick({ type: 'cursor', value: 'Left' });
      assert.calledWith(mq.keystroke, 'Left');
    });

    test('handles write', () => {
      wrapper.instance().onClick({ value: '\\sqrt{3}' });
      assert.calledWith(mq.write, '\\sqrt{3}');
    });
  });

  describe('onInputClick', () => {
    test('in calls props.onInputClick', () => {
      let onInputClick = stub();
      wrapper.instance().onInputClick(e);
      assert.notCalled(onInputClick);
      wrapper.setProps({ onInputClick });
      const e = {}
      wrapper.instance().onInputClick(e);
      assert.calledWith(onInputClick, e)
    });
  });

  describe('onInputFocus', () => {
    test('it sets state.showCalculator to true', () => {
      wrapper.instance().onInputFocus();
      expect(wrapper.state('showCalculator')).toEqual(true);
    });
  });

  describe('blur', () => {
    test('it sets state.showCalculator to false', () => {
      wrapper.instance().blur();
      expect(wrapper.state('showCalculator')).toEqual(false);
    });
  });

  describe('onInputBlur', () => {
    it('sets state.removePortal to true', () => {
      wrapper.instance().onInputBlur({});
      expect(wrapper.state('removePortal')).toEqual(true);
    });

    it('sets showCalculator to false after 100ms', () => {
      wrapper.setState({ showCalculator: true });
      wrapper.instance().onInputBlur({});
      expect(wrapper.state('showCalculator')).toEqual(true);
      clock.tick(101);
      expect(wrapper.state('showCalculator')).toEqual(false);
    });
  });

  describe('onCodeEditorBlur', () => {
    it('sets state.removePortal to true', () => {
      wrapper.instance().onCodeEditorBlur({});
      expect(wrapper.state('removePortal')).toEqual(true);
    });

    it('sets showCalculator to false after 100ms', () => {
      wrapper.setState({ showCalculator: true });
      wrapper.instance().onCodeEditorBlur({});
      expect(wrapper.state('showCalculator')).toEqual(true);
      clock.tick(101);
      expect(wrapper.state('showCalculator')).toEqual(false);
    });
  });

  describe('onToggleCode', () => {
    let mq;
    beforeEach(() => {
      mq = {
        focus: stub()
      }
      wrapper.instance().mq = mq;
    });

    it('calls mq.focus if toggle is true', () => {
      wrapper.instance().onToggleCode(true);
      assert.notCalled(mq.focus);
    });

    it('calls mq.focus if toggle is false', () => {
      wrapper.instance().onToggleCode(false);
      assert.called(mq.focus);
    });
  });

  describe('componentWillReceiveProps', () => {
    it('sets state.showCalculator to false if readOnly', () => {
      wrapper.instance().componentWillReceiveProps({ readOnly: true });
      expect(wrapper.state('showCalculator')).toEqual(false);
    })
  });
});
