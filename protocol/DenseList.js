import IsoBuffer from './IsoBuffer';

export const pack = (items) => {
  const length = items.length;
  let size = 2; // 2 bytes for UInt16 length as first bytes
  // Run through and estimate size
  for (let i = 0; i < length; i++) {
    size += items[i].byteLength + 4; // 4 bytes for UInt32 Size
  }

  // Allocate buffer
  const buffer = IsoBuffer.alloc(size);
  // Write size to array
  buffer.setUint16(length, 0);

  let cursor = 2;
  for (let j = 0; j < length; j++) {
    buffer.setUint32(items[j].byteLength, cursor);
    /** @todo: Replace with LinkedBuffer, should improve performance dramatically */
    buffer.write(items[j], cursor + 4, items[j].byteLength);

    cursor += items[j].byteLength + 4;
  }

  return buffer;
};

export const unpack = (buffer) => {
  const length = buffer.getUint16(0);
  let bytesRead = 2; // Read 2 bytes length
  let results = [];

  for (let i = 0; i < length; i++) {
    const size = buffer.getUint32(bytesRead);
    results.push(buffer.reflect(bytesRead + 4, size));
    bytesRead += size + 4;
  }

  return {
    results,
    bytesRead
  };
};
