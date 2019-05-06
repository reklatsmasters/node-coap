const coap  = require('../') // or coap
const dtls = require('@nodertc/dtls');

const socket = dtls.connect({
  type: 'udp4',
  remotePort: 8089,
  remoteAddress: '127.0.0.1',
  maxHandshakeRetransmissions: 3,
  alpn: 'coap',
  pskIdentity: 'coap',
  pskSecret: 'deadbeaf',
  cipherSuites: [
    'TLS_PSK_WITH_AES_128_GCM_SHA256',
    'TLS_PSK_WITH_AES_256_GCM_SHA384'
  ]
})

const agent = new coap.Agent({ socket });

const req = coap.request({ agent })

req.on('response', function(res) {
  res.pipe(process.stdout)
  
  socket.close();
})

req.end()
