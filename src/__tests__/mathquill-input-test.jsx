import MathQuillInput from '../mathquill-input.jsx';
import React from 'react';
import { assert } from 'sinon';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { staticField } from '../../__mocks__/mathquill-mock';

const handleClick = () => { };

test('mounting', () => {
  const input = shallow(<MathQuillInput
    readOnly={false}
    latex={'1+1=2'}
    onClick={handleClick} />
  );

  // console.log('staticField: ', staticField);

  assert.calledWith(staticField.latex, '1+1=2');
});

test('MathQuillInput readonly false', () => {

  const notReadOnly = renderer.create(
    <MathQuillInput
      readOnly={false}
      latex={'1+1=2'}
      onClick={handleClick}
    />
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