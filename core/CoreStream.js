import CoreEventEmitter from './CoreEventEmitter';

class CoreStream {
  constructor() {
    this.publisher = () => { /* noop */ };
    this.subscribers = [];
  }

  _read(message) {
    const subscribersLength = this.subscribers.length;

    for (let i = 0; i < subscribersLength; i++) {
      this.subscribers[i](message);
    }
  }

  _write(message) {
    this.publisher(message);
  }

  /**
   * Feed a chunk from transport media
   * to stream
   * 
   * @param {ArrayBuffer|String} chunk
   */
  triggerRead(chunk) {

  }

  onWrite(publisher) {
    this.publisher = publisher;
  }

  subscribe(handler) {
    const subscribers = new Set(this.subscribers);
    subscribers.add(handler);
    
    this.subscribers = [...subscribers];
  }

  dispatch(message) {
    /** @todo: Add stream processing to Schema-less and binary packing here */
    this._write(message);
  }
}

export default CoreStream;