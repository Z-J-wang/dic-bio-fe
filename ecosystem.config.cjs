module.exports = {
  apps: [
    {
      name: 'blc-bio',
      port: '3000', // 根据实际项目占用端口调整
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
