class LinkedBuffer {
  constructor() {
    this.pool = [];
    this.size = 0;
  }

  _findPartByIndex(index) {
    if (index >= this.size || index < 0) {
      throw new RangeError('LinkedBuffer: Out of bounds');
    }

    let stepCounter = 0;
    let indexCounter = 0;
    let priorSizeCounter = 0;

    while(indexCounter < index) {
      indexCounter += this.pool[stepCounter].byteLength;
      if (indexCounter >= index) break;
      stepCounter++;
      priorSizeCounter += indexCounter;
    }

    return {
      part: this.pool[stepCounter],
      offset: index - priorSizeCounter,
      counted: indexCounter
    };
  }

  allocate(size = 64) {
    this.pool.push(new Uint8ClampedArray(size));
    this.size += size;
  }

  get(index) {
    const { part, offset } = this._findPartByIndex(index);
    return part[offset];
  }

  set(index, value) {
    const { part, offset } = this._findPartByIndex(index);

    if (typeof value !== 'number') throw new TypeError('LinkedBuffer: Set expects an integer byte');

    part[offset] = value;
  }
}

export default LinkedBuffer;
