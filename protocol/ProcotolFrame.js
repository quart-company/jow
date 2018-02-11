import { TextEncoder, TextDecoder } from 'text-encoding';

const PROTOCOL_START = 0x01; // SOH

const SizeInUInt8Array = (number) => {
  // Size is limited to uint32
  const uint32 = new Uint32Array(1);
  uint32[0] = number;
  return new Uint8Array(uint32);
};

export default class ProcotolFrame {
  static createFrame(name, data) {
    const encoder = new TextEncoder();

    const encodedName = encoder.encode(name);
    const eNameSize = SizeInUInt8Array(encodedName.byteLength);

    const encodedData = encoder.encode(data);
    const eDataSize = SizeInUInt8Array(encodedData.byteLength);

    const frame = [PROTOCOL_START, eNameSize, encodedName, eDataSize, encodedData];

    let size = 1 + eNameSize.byteLength + encodedName.byteLength + eDataSize.byteLength + encodedData.length;

    return {
      frame,
      size
    };
  }

  static frameToBytes(frame) {
    const frameElements = frame.length;
    

    const bytes = new Uint8Array(size);

    // Size run
    for (let i = 0; i < frameElement; i++) {
      const element = frame[i];
      // Frame should only include UInt8Arrays
      if (typeof element === 'object' && element.BYTES_PER_ELEMENT === 1) {
        size += element.byteLength;
      } else if (typeof element === 'number') {
        size++;
      }
    }
  }

  addLevel(level = 'root') {
    this.levels.push(level);
  }

  // Expects UTF-8
  write(chunk = '') {
    
  }
}