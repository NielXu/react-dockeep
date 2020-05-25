module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
};