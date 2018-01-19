import CoreStream from './CoreStream';

class JOW extends CoreStream {
  constructor() {
    super();
  }

  connect() {
    // Send and CONNECT message
    setImmediate(() => this.dispatch({ type: 'CONNECT' }));
  }
}

export default JOW;