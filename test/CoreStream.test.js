import test from 'ava';
import CoreStream from '../build/CoreStream';

test('create a new instance', (t) => {
  new CoreStream();
  t.pass();
});

test.cb('send INIT message', (t) => {
  const stream = new CoreStream();

  stream.once('protocol:message', (message) => t.deepEqual(message, {
    type: 'INIT'
  }) + t.end());
});
