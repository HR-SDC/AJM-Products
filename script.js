// const http = require('k6/http');
const http = require('k6/http');

export default function () {
  http.get('http://localhost:3500/products');
  // http.get('http://localhost:3500/products/994594');
}

// import http from 'k6/http';
// import { sleep } from 'k6';

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }
