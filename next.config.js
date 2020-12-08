module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(md|txt)$/,
      use: 'raw-loader',
    })

    return config
  },
}
