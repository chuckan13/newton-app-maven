const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/main/js/app.js',
	devtool: 'sourcemaps',
	cache: true,
	mode: 'development',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/resources/static/index.html'
        }),
    ],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ]
						}
					}
				]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                     // Creates `style` nodes from JS strings
                     'style-loader',
                      // Translates CSS into CommonJS
                      'css-loader',
                      // Compiles Sass to CSS
                      'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ],
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ]
            },
		]
    },
};
