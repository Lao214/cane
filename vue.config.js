const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8234,
    client: {
      overlay: {
        runtimeErrors: false
      }
    }
  },
  lintOnSave: false
})
