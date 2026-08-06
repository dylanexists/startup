const DashEvent = {
  ToOrFromAdmin: 'admin',
  System: 'system',
  Auth: 'auth',
  UserNoti: 'user_notification'
};

class EventMessage {
  constructor(from, recipientId, type, value) {
    this.from = from;
    this.recipientId = recipientId;
    this.type = type;
    this.value = value;
  }
}

class DashEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new EventMessage('RentItBest', null, DashEvent.System, 'connected'));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new EventMessage('RentItBest', null, DashEvent.System, 'disconnected'));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data);
        this.receiveEvent(event);
      } catch { console.log("WEEWOO")}
    };
  }

  authenticate(userId) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: DashEvent.Auth, userId }));
    } else {
      this.socket.addEventListener('open', () => {
        this.socket.send(JSON.stringify({ type: DashEvent.Auth, userId }));
      }, { once: true });
    }
  }

  sendNotification(from, recipientId, type, value) {
    if (this.socket.readyState === WebSocket.OPEN) {
        const event = new EventMessage(
            from,
            recipientId,
            type,
            value
        )
        console.log("Notification Sent!")
        this.socket.send(JSON.stringify(event))
    }
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
        handler(event);
    });
  }
}

const DashNotifier = new DashEventNotifier();
export { DashEvent, DashNotifier };
