import test from 'ava';
import LinkedBuffer from '../build/LinkedBuffer';

test('create a new instance', (t) => {
  new LinkedBuffer();
  t.pass();
});

test('allocate buffer', (t) => {
  const linkedBuffer = new LinkedBuffer();
  linkedBuffer.allocate(1200);

  t.is(linkedBuffer.size, 1200, 'Size of buffer did not match expected value');
});

test('allocate multiple buffers', (t) => {
  const linkedBuffer = new LinkedBuffer();
  linkedBuffer.allocate(50);
  linkedBuffer.allocate(50);
  linkedBuffer.allocate(50);

  t.is(linkedBuffer.size, 150, 'Size of buffer did not match expected value');
});

test('get/set bytes in buffer', (t) => {
  const linkedBuffer = new LinkedBuffer();
  linkedBuffer.allocate(25);
  linkedBuffer.allocate(25);

  linkedBuffer.set(40, 4);
  t.is(linkedBuffer.get(40), 4);

  t.throws(() => linkedBuffer.set(49, 'Hello World'), TypeError);
  t.throws(() => linkedBuffer.set(449, 2), RangeError);
});