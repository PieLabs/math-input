import MathQuillInput, { MathQuillInput as UnstyledInput } from '../mathquill-input.jsx';
import { mathField, resetMocks, staticField } from '../../__mocks__/mathquill-mock';

import React from 'react';
import { assert } from 'sinon';
import debug from 'debug';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const log = debug('test:math-input');

const handleClick = () => { };

let wrapper, input;

beforeEach(() => {
  resetMocks();
  wrapper = mount(<UnstyledInput
    classes={{}}
    readOnly={false}
    latex={'1+1=2'}
    innerRef={r => input = r}
    onClick={handleClick} />
  );
});

test('command', () => {
  wrapper.instance().command('cmd');
  assert.calledWith(mathField.cmd, 'cmd');
  assert.called(mathField.focus);
});

test('mounting', () => {
  assert.calledWith(staticField.latex, '1+1=2');
});

test('focus', () => {
  wrapper.instance().focus();
  assert.called(mathField.focus);
});

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