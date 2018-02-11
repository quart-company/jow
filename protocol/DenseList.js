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
  buffer.writeUInt16BE(length, 0);

  let cursor = 2;
  for (let j = 0; j < length; j++) {
    buffer.writeUInt32BE(items[j].byteLength, cursor);
    buffer.write(items[j], cursor + 4, items[j].byteLength);

    cursor += items[j].byteLength + 4;
  }

  return buffer;
};

export const unpack = (buffer) => {
  const length = buffer.readUInt16BE(0);
  let bytesRead = 2; // Read 2 bytes length
  let results = [];

  for (let i = 0; i < length; i++) {
    const size = buffer.readUInt32BE(bytesRead);
    bytesRead += 4; // Read 4 bytes size
    results.push(buffer.slice(bytesRead, bytesRead + size));
    bytesRead += size;
  }

  return {
    results,
    bytesRead
  };
};
