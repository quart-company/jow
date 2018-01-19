import test from 'ava';
import JOW from '../';

test('create a new instance', (t) => {
  new JOW();
  t.pass();
});

test.cb('send CONNECT message on connect', (t) => {
  const stream = new JOW();

  stream.onWrite((message) => t.deepEqual(message, {
    type: 'CONNECT'
  }) + t.end());

  setImmediate(() => stream.connect());
});
