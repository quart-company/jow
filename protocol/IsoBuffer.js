// Isomorphic Buffer
export default class IsoBuffer extends Uint8Array {
  constructor(a1, a2, a3) {
    super(a1, a2, a3);
    this.dataView = new DataView(this.buffer);
  }

  getUint16(offset, le = false) {
    return this.dataView.getUint16(offset, le);
  }

  getUint32(offset, le = false) {
    return this.dataView.getUint32(offset, le);
  }

  setUint16(value, byteOffset, le = false) {
    this.dataView.setUint16(byteOffset, value, le);
  }

  setUint32(value, byteOffset, le = false) {
    this.dataView.setUint32(byteOffset, value, le);
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

  reflect(start, size) {
    return new IsoBuffer(this.buffer, start, size);
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
