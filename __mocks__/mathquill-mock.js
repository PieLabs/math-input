const sinon = require('sinon');

const stubField = () => ({
  latex: sinon.stub()
});


const staticField = stubField();
const mathField = stubField();

const MQ = {
  StaticMath: () => staticField,
  MathField: () => mathField
}

const defaultExport = {
  getInterface: () => MQ,
  staticField,
  mathField
};

module.exports = defaultExport
