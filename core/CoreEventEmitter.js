class CoreEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  _add(ev, handler) {
    const list = this.listeners.get(ev) || [];
    list.push(handler);

    // Convert to Set and back to Array to keep unique
    this.listeners.set(ev, [...(new Set(list))]);
  }

  _remove(ev, handler) {
    if (!this.listeners.has(ev)) return false;
    // Remove entire entry if handler is not given
    if (!handler) return this.listeners.delete(ev);

    // Build a set to filter out unique items
    const set = new Set(this.listeners.get(ev));
    // Delete item
    set.delete(handler);
    
    // Check if set is empty and delete entry
    if (set.size < 1) return this.listeners.delete(ev);

    // Expand set
    this.listeners.set(ev, [...set]);

    // Return successful delete
    return true;
  }

  emit(ev, ...args) {
    if (!this.listeners.has(ev)) return;

    const listeners = this.listeners.get(ev);
    const listenersLength = listeners.length; // Cache length
    
    for (let i = 0; i < listenersLength; i++) {
      // Calls can be further optimized by using a
      // switch statement and constructing call based
      // on args length
      listeners[i](...args);
    }
  }

  on(ev, handler) {
    this._add(ev, handler);
  }

  once(ev, handler) {
    this._add(ev, (...args) => this._remove(ev, handler) && handler(...args));
  }

  removeListener(ev, handler) {
    this._remove(ev, handler);
  }
}

export default CoreEventEmitter;