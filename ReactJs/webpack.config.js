const path = require('path');


var config ={
  entry:'./main.js',
  output:{
    path: path.resolve(__dirname, './'),
    filename:'index.js'
  },
  devServer:{
    inline: true,
    port: 8080,
    historyApiFallback: true
  },

  module:{
    loaders:[
      {
        test:/\.jsx?$/,
        loader:'babel-loader',
        exclude: /node_modules/,
        query:{
          presets:['es2015','react']
        }
      },
      { 
        test: /\.scss/, 
        exclude: /node_modules/, 
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      }
    ]
  }
};

module.exports = config;
