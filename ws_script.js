import ws from 'k6/ws';
import { check, sleep } from 'k6';

export const options = {
    vus: 1000, // Number of virtual users
    duration: '20s', // Test duration
};

export default function () {
    const url = 'wss://echo.websocket.org/';
    const params = { tags: { test_tag: 'ws-echo' } };

    const res = ws.connect(url, params, function (socket) {
        socket.on('open', function () {
            socket.send('Hello from k6 WS!');
        });

        socket.on('message', function (message) {
            console.log('Message received:', message);
            socket.close();
        });

        socket.on('close', function () {
            console.log('Connection closed');
        });

        socket.on('error', function (e) {
            if (e.error() !== 'websocket: close sent') {
                console.error('Error:', e.error());
            }
        });
    });

    check(res, { 'status is 101': (r) => r && r.status === 101 });
    sleep(1); // Allow time for processing
}

