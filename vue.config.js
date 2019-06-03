module.exports = {
  devServer:{//代理
    proxy: {
      '/api': {
          target: 'http://gendanwang.com/api/',
          changeOrigin: true,
      }
  }
  },
  publicPath:  "./",
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  }
}
