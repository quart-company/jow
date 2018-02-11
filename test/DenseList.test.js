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

  const length = dense.getUint16(0);
  const sizei1 = dense.getUint32(2);

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

test('pack up to max number of elements', (t) => {
  const max = 65535;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let elements = [];
  let elementsRaw = [];
  
  for (let i = 0; i < max; i++) {
    const text = `i-${i}`;
    elements.push(encoder.encode(text));
    elementsRaw.push(text);
  }

  const dense = pack(elements);
  const { results: list, bytesRead } = unpack(dense);

  t.true(Array.isArray(list));
  t.is(list.length, max);
  
  for (let j = 0; j < max; j++) {
    t.is(decoder.decode(list[j]), `i-${j}`);
  }
});
