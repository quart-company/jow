// Isomorphic Buffer
export default class IsoBuffer extends Uint8Array {
  constructor(size) {
    super(size);
  }

  writeUInt16BE(value, offset) {
    const _value = + value;
    const _offset = offset >>> 0;

    this[_offset] = _value >>> 8;
    this[_offset + 1] = _value;
  }

  writeUInt32BE(value, offset) {
    const _value = + value;
    const _offset = offset >>> 0;

    this[_offset] = _value >>> 24;
    this[_offset + 1] = _value >>> 16;
    this[_offset + 2] = _value >>> 8;
    this[_offset + 3] = _value;
  }

  write(value, offset, length) {
    if (!value || !value.byteLength || !Number.isInteger(offset) || !Number.isInteger(length)) {
      throw new Error('Invalid arguments passed to IsoBuffer#write');
    }

    if (value.byteLength !== length) {
      throw new Error('Length does not match value\'s byteLength');
    }

    const size = length + offset;
    let vi = 0;

    if (size > this.byteLength) {
      throw new RangeError('IsoBuffer#write exceeds allocated size');
    }

    for (let i = offset; i < size; i++) {
      this[i] = value[vi++];
    }
  }

  readUInt16BE(offset = 0) {
    const _offset = offset >>> 0;
    return (this[_offset] << 8) | this[_offset + 1];
  }

  readUInt32BE(offset = 0) {
    const _offset = offset >>> 0;
    return (this[_offset] * 0x1000000) + ((this[_offset + 1] << 16) | (this[_offset + 2] << 8) | this[_offset + 3]);
  }

  static compare(b1, b2) {
    if (b1 === b2) return true;
    if (b1.byteLength !== b2.byteLength) return false;

    const size = b1.byteLength;

    for (let i = 0; i < size; i++) {
      if (b1[i] !== b2[i]) return false;
    }

    return true;
  }

  get size() {
    return this.byteLength;
  }

  static alloc(size) {
    return new IsoBuffer(size);
  }
}
