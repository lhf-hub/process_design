const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,





  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '/Monitor/bind': {
  //       target: 'http://localhost:7214/',

  //     },
  //     '/Monitor/query': {
  //       target: 'http://localhost:7214/',

  //     },
  //   },
  // },
})
