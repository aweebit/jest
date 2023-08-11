const {createRequire} = require('module');
const myRequire = createRequire(__filename);

const resolved = myRequire.resolve('../../build/colorLevel.js');

const originalArgv = process.argv;
process.argv = ['--color=16m'];
const colorLevel3 = myRequire(resolved).default;
process.argv = originalArgv;
console.log(resolved in myRequire.cache);
delete myRequire.cache[resolved];
console.log(resolved in myRequire.cache);
console.log(colorLevel3);

const originalForceColor = process.env.FORCE_COLOR;
process.env.FORCE_COLOR = '0';
const colorLevel0 = myRequire(resolved).default;
if (originalForceColor === undefined) {
  delete process.env.FORCE_COLOR;
} else {
  process.env.FORCE_COLOR = originalForceColor;
}
console.log(resolved in myRequire.cache);
delete myRequire.cache[resolved];
console.log(resolved in myRequire.cache);
console.log(colorLevel0);
