module.exports = {
  apps : [{
    name: 'trainer.api',
    script: '../trainer-dataservices/server.js',
    cwd: '../trainer-dataservices',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
 };
