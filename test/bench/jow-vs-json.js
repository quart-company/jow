import test from 'ava';
import suite from 'chuhai';
import { pack, unpack } from '../../build/DenseList';
import IsoBuffer from '../../build/IsoBuffer';
import { TextEncoder, TextDecoder } from 'text-encoding';

// Prep
const size = 655;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let elements = [];
let elementsRaw = [];
let ch = '';
for (let c = 0; c < 100; c++) {
  ch += c + '';
}

for (let i = 0; i < size; i++) {
  const text = `i-${i}-test-hello-world-${ch}`;
  elements.push(encoder.encode(text));
  elementsRaw.push(text);
}

test('packing', suite.macro, (t) => {
  t.set('maxTime', 1);
  t.set('minSamples', 10);

  let s1 = '';
  let s2 = '';

  t.cycle(() => {
    s1 = null;
    s2 = null;
  });

  t.bench('JSON#stringify', () => {
    s1 = JSON.stringify(elementsRaw);
    t.is(s1.length, 141371);
  });

  t.bench('JOW#pack', () => {
    s2 = pack(elements);
    t.is(s2.byteLength, 142027);
  });

  /*
  t.true(Array.isArray(list));
  t.is(list.length, max);
  
  for (let j = 0; j < max; j++) {
    t.is(decoder.decode(list[j]), `i-${j}-test-hello-world-${ch}`);
  }

  t.deepEqual(jsonElements, elementsRaw);*/
});

test('unpacking', suite.macro, (t) => {
  t.set('maxTime', 4);
  t.set('minSamples', 10);

  let s1 = JSON.stringify(elementsRaw);
  let s2 = pack(elements);
  let r1 = [];
  let r2 = [];

  t.bench('JSON#parse', () => {
    r1 = JSON.parse(s1);
    t.is(r1.length, size);
  });

  t.bench('JOW#unpack', () => {
    const { results, bytesRead } = unpack(s2);
    r2 = results;
    t.is(r2.length, size);
  });

  /*
  t.true(Array.isArray(list));
  t.is(list.length, max);
  
  for (let j = 0; j < max; j++) {
    t.is(decoder.decode(list[j]), `i-${j}-test-hello-world-${ch}`);
  }

  t.deepEqual(jsonElements, elementsRaw);*/
});
