export default function loaderConfig(includePath) {
  const babelConfig = {
    test: /\.jsx?/,
    loaders: ['babel'],
    include: includePath,
    modules: ['babel-loader', 'babel-core', 'babel-preset-es2015'],
    query: {
      presets: ['es2015']
    }
  }

  const postCSSLoaderConfig = {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
      modules: ['postcss-loader']
  }

  const lessLoaderConfig = {
      test: /\.less$/,
      loaders: ['style', 'css', 'less'],
      modules: ['less-loader']
  }

  const sassLoaderConfig = {
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass'],
    modules: ['sass-loader', 'node-sass']
  }

  const urlLoaderConfig = {
    test: /\.(png|jpg)$/,
    loaders: ['url'],
    query: {
      limit: 8192
    },
    modules: ['url-loader']
  }

  return {
    babel: babelConfig,
    postcss: postCSSLoaderConfig,
    less: lessLoaderConfig,
    sass: sassLoaderConfig,
    url: urlLoaderConfig
  }
}
