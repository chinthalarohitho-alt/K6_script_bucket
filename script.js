// -------------------------------------------- Example for Stagges --------------------------------------------
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 20, // number of concurrent users
  duration: '30s', // test duration
};

export default function () {
  const req1 = {
    method: 'GET',
    url: 'https://quickpizza.grafana.com/api/get',
  };
  const req2 = {
    method: 'DELETE',
    url: 'https://quickpizza.grafana.com/api/delete',
  };
  const req3 = {
    method: 'POST',
    url: 'https://quickpizza.grafana.com/api/post',
    body: JSON.stringify({ hello: 'world!' }),
    params: { headers: { 'Content-Type': 'application/json' } },
  };

  // Issue all requests in parallel
  const responses = http.batch([req1, req2, req3]);

  // Example check for the POST response
  check(responses[2], {
    'form data OK': (res) => JSON.parse(res.body)['hello'] == 'world!',
  });
}