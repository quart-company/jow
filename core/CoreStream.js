import CoreEventEmitter from './CoreEventEmitter';

class CoreStream extends CoreEventEmitter {
  constructor() {
    super();
    
    // Send and INIT message
    setImmediate(() => this._send({ type: 'INIT' }));
  }

  _send(message) {
    this.emit('protocol:message', message);
  }

  /**
   * Write a chunk from transport media
   * to stream
   * 
   * @param {ArrayBuffer|String} chunk
   */
  write(chunk) {

  }
}

export default CoreStream;