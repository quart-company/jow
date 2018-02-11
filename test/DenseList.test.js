import test from 'ava';
import { pack, unpack } from '../build/DenseList';
import IsoBuffer from '../build/IsoBuffer';
import { TextEncoder, TextDecoder } from 'text-encoding';

test('pack single item', (t) => {
  const i1 = new Uint8Array([1,2,3]);

  const dense = pack([i1]);

  t.true(IsoBuffer.compare(dense, new Uint8Array([0, 1, 0, 0, 0, 3, 1, 2, 3])));
});

test('pack multiple items', (t) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const text = "Hello World";

  const i1 = encoder.encode(text);
  const i2 = new Uint8Array([3,4]);
  const i3 = new Uint8Array([0,0,0,0,0]);

  const dense = pack([i1, i2, i3]);

  t.is(dense[0], 0);
  t.is(dense[1], 3);

  const length = dense.readUInt16BE(0);
  const sizei1 = dense.readUInt32BE(2);

  t.is(length, 3);
  t.is(sizei1, i1.byteLength);

  t.is(decoder.decode(dense.slice(6, sizei1 + 6)), text);
});

test('unpack a single element', (t) => {
  const i1 = new Uint8Array([4,4,1]);

  const dense = pack([i1]);
  const { results: list } = unpack(dense);

  t.true(Array.isArray(list));
  t.is(list.length, 1);
  t.true(IsoBuffer.compare(list[0], i1));
});

test('unpack multiple elements', (t) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const text = "Hello World";

  const i1 = encoder.encode(text);
  const i2 = new Uint8Array([4,4,1]);

  const dense = pack([i1, i2]);
  const { results: list } = unpack(dense);

  t.true(Array.isArray(list));
  t.is(list.length, 2);
  t.is(decoder.decode(list[0]), text);
  t.true(IsoBuffer.compare(list[1], i2));
});
