const env = {
  environment: 'production',
  server: {
    host: '0.0.0.0',
    port: 8181
  },
  jwt: {
    headers: {
      token: 'jwt-token',
      consumer: 'jwt-consumer'
    },
    secrets: {
      'trainer-client': 'this-is-the-jwt-secret-for-the-oms-trainer'
    },
    expiresIn: 60
  }
}

module.exports = env
