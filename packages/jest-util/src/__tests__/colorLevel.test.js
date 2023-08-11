/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {createRequire} = require('module');
const myRequire = createRequire(__filename);

it('delivers new object respecting changes to color support after deleting require.cache entry', () => {
  const resolved = myRequire.resolve('../../build/colorLevel.js');

  const originalArgv = process.argv;
  process.argv = ['--color=16m'];
  const colorLevel3 = myRequire(resolved).default;
  process.argv = originalArgv;
  console.log(resolved in myRequire.cache);
  delete myRequire.cache[resolved];
  console.log(resolved in myRequire.cache);
  console.log(colorLevel3);
  expect(colorLevel3).toEqual({stderr: 3, stdout: 3});

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
  expect(colorLevel0).toEqual({stderr: 0, stdout: 0});
  expect(colorLevel0).not.toBe(colorLevel3);
});
