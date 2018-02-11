import test from 'ava';
import IsoBuffer from '../build/IsoBuffer';
import { TextEncoder, TextDecoder } from 'text-encoding';

test('create a new instance', (t) => {
  new IsoBuffer();
  t.pass();
});

test('allocate buffer', (t) => {
  const buffer = IsoBuffer.alloc(1000);
  t.is(buffer.byteLength, 1000, 'Byte length of buffer did not match expected value');
  t.is(buffer.size, 1000, 'Size of buffer did not match expected value');
});

test('allocate empty/safe buffer', (t) => {
  const buffer = IsoBuffer.alloc(100);
  t.is(buffer.byteLength, 100, 'Byte length of buffer did not match expected value');

  for (let i = 0; i < buffer.size; i++) {
    t.is(buffer[i], 0);
  }
});

test('write to buffer', (t) => {
  const buffer = IsoBuffer.alloc(100);
  const encoder = new TextEncoder();
  const text = encoder.encode('hello world');

  buffer.write(text, 0, text.byteLength);
  t.true(IsoBuffer.compare(buffer.slice(0, text.byteLength), text));
  t.is(buffer.slice(text.byteLength, buffer.size).reduce((a, b) => a + b, 0), 0);
});

test('write to buffer at offset', (t) => {
  const buffer = IsoBuffer.alloc(100);

  const encoder = new TextEncoder();
  const text = encoder.encode('hello world');
  const size = text.byteLength;

  buffer.write(text, 2, size);

  t.is(buffer[0], 0);
  t.is(buffer[1], 0);
  t.true(IsoBuffer.compare(buffer.slice(2, size + 2), text));
});
