const jwt = require('jsonwebtoken')

const env = require('../config/env.js');

const Authentication = ({

  MESSAGES: {
    HEADERS_MISSING: 'Headers missing',
    TOKEN_INVALID: 'Token invalid',
    CONSUMER_INVALID: 'Consumer invalid',
  },

  // Middleware for verifying JWT.
  JWTVerifier: (req, res, next) => {
    // Skip authentication in non-production (debugging) environments.
    if (process.env.NODE_ENV !== 'production') {
      return next();
    }

    const jwtToken = req.headers[env.jwt.headers.token];
    const jwtConsumer = req.headers[env.jwt.headers.consumer];

    // Make sure JWT headers are declared.
    if (!jwtToken || !jwtConsumer) {
      return res.status(400).json({ message: Authentication.MESSAGES.HEADERS_MISSING });
    }

    try {
      // Make sure the JWT secret for the consumer is valid.
      const secret = env.jwt.secrets[jwtConsumer];
      if (!secret) {
        return res.status(403).json({ message: Authentication.MESSAGES.CONSUMER_INVALID });
      }

      try {
        // Verify validity of the token.
        jwt.verify(jwtToken, secret, {maxAge: 60});

        return next();
      }
      catch (err) {
        return res.status(403).json({ message: Authentication.MESSAGES.TOKEN_INVALID });
      }
    }
    catch (error) {
      return next(error);
    }
  }

})

module.exports = Authentication
