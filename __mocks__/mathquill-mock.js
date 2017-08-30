import { stub } from 'sinon';

const stubField = () => {
  const out = {}

  out.reset = () => {
    out.latex = stub();
    out.focus = stub();
    out.cmd = stub();
  }

  out.reset();
  return out;
};

export const staticField = stubField();
export const mathField = stubField();

const MQ = {
  StaticMath: () => staticField,
  MathField: () => mathField
}

export default {
  getInterface: () => MQ
};

export const resetMocks = () => {
  staticField.reset();
  mathField.reset();
}