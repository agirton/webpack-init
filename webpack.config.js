module.exports = {
  entry: 'index.js',
  output: {
    path: './',
    filename: 'bundle.js',
    publicPath: undefined
  },
  loaders: [
    {
      test: /\.jsx?/,
      loaders: [
        'babel'
      ],
      include: 'index.js',
      query: {
        presets: [
          'es2015'
        ]
      }
    },
    {
      test: /\.scss$/,
      loaders: [
        'style',
        'css',
        'sass'
      ]
    },
    {
      test: /\.(png|jpg)$/,
      loaders: [
        'url'
      ],
      query: {
        limit: 8192
      }
    }
  ]
}