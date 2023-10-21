import Events from './Events';

class Dispatcher {
  listeners: any;
  
  constructor() {
    this.listeners = {};
  }

  dispatch(eventKey: Events, ...data: any[]) {
    if (this.listeners[eventKey]) {
      this.listeners[eventKey].forEach((handler: any) => {
        handler(...data);
      });
    }
  }

  register(eventKey: Events, handler: any) {
    if (!this.listeners[eventKey]) {
      this.listeners[eventKey] = [];
    }
    this.listeners[eventKey].push(handler);
  }

  reset(eventKey: Events) {
    if (this.listeners[eventKey]) {
      this.listeners[eventKey] = [];
    }
  }
}

export default new Dispatcher();
