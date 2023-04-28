import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

const config = {
    devtool: 'source-map',
    mode: 'development',
    entry: './src/ts/index.ts',
    output: {
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    experiments: {
        topLevelAwait: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src/html/index.html')
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: 'asset'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset'
            }
        ]
    },
    devServer: {
        static: { directory: path.resolve('dist') },
        hot: true, // optional, but don't enable hot _and_ liveReload together
        liveReload: false,
        open: true,
        port: 9000
    }
}

export default config
