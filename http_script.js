import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  stages: [
    { duration: '3s', target: 0 },
    { duration: '15s', target: 10 },
    { duration: '3s', target: 0 }
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'],
    'http_req_failed': ['rate<0.05']
  }
};

const BASE_URL = 'https://alpha1.yellowmessenger.com';
const BOT_ID = 'x1742443933167';

export default function () {


  // Endpoint 1: POST /integrations/yellowmessenger/receive?bottype=sandbox&bot=${BOT_ID}
  group('receiveApi', () => {
    const payload = JSON.stringify({
      from: "956617932451876163715619",
      to: "x1742443933167",
      message: "{\"message\":\"hello\",\"source\":\"yellowmessenger\",\"subSource\":null,\"messageId\":1758800880709,\"pageUrl\":\"https://alpha1.yellowmessenger.com/liveBot/x1742443933167?region=\",\"isSensitiveInfo\":false}",
      xmppNotUsed: true
    });

    const params = {
      headers: {
        'x-api-key': 'IUC5_v1XYMPXeZaUWHaR_hWlKc_MzNh60g8vWJOI',
        'Content-Type': 'application/json' // Specify content type as JSON
      },
    };

    let res1 = http.post(`${BASE_URL}/integrations/yellowmessenger/receive?bottype=sandbox&bot=${BOT_ID}`, payload, params);

    check(res1, { 'Endpoint 1 status is 200': (r) => r.status === 200 });
    sleep(1);
  });
}
