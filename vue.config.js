module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.103:8082',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
