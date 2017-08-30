import { MQ, mathField, resetMocks, staticField } from '../../__mocks__/mathquill-mock';
import MathQuillInput, { MathQuillInput as UnstyledInput } from '../mathquill-input.jsx';
import { assert, match, stub } from 'sinon';

import React from 'react';
import debug from 'debug';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const log = debug('test:math-input');

const handleClick = () => { };

let wrapper, input, onChange;

describe('lifecycle', () => {

  beforeEach(() => {

    onChange = stub();

    resetMocks();
    wrapper = mount(<UnstyledInput
      classes={{}}
      readOnly={false}
      latex={'1+1=2'}
      innerRef={r => input = r}
      onClick={handleClick}
      onChange={onChange} />
    );
  });

  test('command', () => {
    wrapper.instance().command('cmd');
    assert.calledWith(mathField.cmd, 'cmd');
    assert.called(mathField.focus);
  });

  test('keystroke', () => {
    wrapper.instance().keystroke('cmd');
    assert.calledWith(mathField.keystroke, 'cmd');
    assert.called(mathField.focus);
  });

  test('write', () => {
    wrapper.instance().write('write');
    assert.calledWith(mathField.write, 'write');
    assert.called(mathField.focus);
    assert.calledWith(onChange, 'latex');
  });

  describe('componentDidMount', () => {
    test('creates MQ.StaticMath', () => {
      assert.called(MQ.StaticMath);
    });

    test('creates MQ.MathField', () => {
      assert.calledWith(MQ.MathField, match.any, {
        handlers: {
          edit: match.func
        }
      });
    });

    test('calls staticFieldLatex', () => {
      assert.calledWith(staticField.latex, '1+1=2');
    });
  });

  test('focus', () => {
    wrapper.instance().focus();
    assert.called(mathField.focus);
  });
});

describe('snapshots', () => {

  test('MathQuillInput readonly false', () => {

    const notReadOnly = renderer.create(
      <MathQuillInput
        readOnly={false}
        latex={'1+1=2'}
        onClick={handleClick} />
    );

    let tree = notReadOnly.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('MathQuillInput readonly true', () => {

    const notReadOnly = renderer.create(
      <MathQuillInput
        readOnly={true}
        latex={'1+1=2'}
        onClick={handleClick}
      />
    );

    let tree = notReadOnly.toJSON();
    expect(tree).toMatchSnapshot();
  });
});