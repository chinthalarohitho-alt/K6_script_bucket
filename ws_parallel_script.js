import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s'
};

const urls = [
  'wss://echo.websocket.events',
  'wss://demos.kaazing.com/echo',
  'wss://ws.postman-echo.com/raw'
];

export default function () {
  const url = urls[(__VU - 1) % urls.length];

  const res = ws.connect(url, {}, function (socket) {

    socket.on('open', function () {
      socket.send('Hello from k6!');
    });
    socket.on('message', function (msg) {
      console.log('Received:', msg);
      socket.close();
    });
    socket.on('close', function () {
      console.log('Connection closed');
    });
    socket.on('error', function (e) {
      console.error('Error:', e.error());
    });
  });
  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
