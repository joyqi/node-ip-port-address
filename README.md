# ip-port-address

Parse IP address and port from a string.

## Installation

```bash
npm install ip-port-address
```

## Usage

```js
var parseAddress = require('ip-port-address');

parseAddress('127.0.0.1:8080');
// { ip: '127.0.0.1', port: 8080, family: 'ipv4' }

parseAddress('[::1]:8080');
// { ip: '::1', port: 8080, family: 'ipv6' }

parseAddress('localhost:8080');
// null

parseAddress('127.0.0.1:8080', 'ipv4');
// { ip: '127.0.0.1', port: 8080, family: 'ipv4' }

parseAddress('[::1]:8080', 'ipv4');
// null
```