const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // js minify plugin

const cardsPath = path.join(process.cwd(), 'landing/assets/images/share/cards');
const landingSourcePath = path.join(process.cwd(), 'landing');
const commonSourcePath = path.join(process.cwd(), 'common');
const distPath = path.join(process.cwd(), 'dist');

require('dotenv').config({ path: path.join(process.cwd(), './.env') });

// eslint-disable-next-line no-sync
const cards = fs.readdirSync(path.join(cardsPath));

module.exports = ({ mode = 'production', isBuildTest }) => {
    const isProduction = mode === 'production';
    const devMode = mode !== 'production';
    const domain = isProduction
        ? process.env.PROD_DOMAIN
        : isBuildTest ? process.env.TEST_DOMAIN : process.env.DEV_DOMAIN;

    return {
        mode,
        entry: [
            path.join(process.cwd(), 'polyfills.js'),
            path.resolve(landingSourcePath, 'assets/scripts/index.js'),
        ],
        output: {
            path: path.resolve(distPath),
            publicPath: '/',
            filename: '[name].[hash].js',
        },
        resolve: {
            extensions: [ '.jsx', '.js', '.png', 'jpg', 'jpeg', '.gif', 'svg' ],
            alias: {
                Pages: path.resolve(__dirname, 'src/pages/'),
                Assets: path.resolve(__dirname, 'src/assets/'),
                Common: commonSourcePath,
            },
        },
        module: {
            rules: [
                {
                    test: /\.[j|t]sx?$/,
                    exclude: /node_modules/,
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-export-default-from',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                        ],
                    },
                    loader: 'babel-loader',
                },
                {
                    test: /\.less|.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                strictMath: true,
                                noIeCompat: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        outputPath: 'images/',
                    },
                },
                {
                    test: /\.(ogg|wav|mp3)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'audio/',
                    },
                },
                {
                    test: /\.(woff|woff2|ttf|otf|eot)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'fonts/',
                    },
                },
                {
                    test: /\.svg/,
                    use: {
                        loader: 'svg-url-loader',
                        options: {},
                    },
                },
            ],
        },
        devServer: {
            contentBase: path.resolve(distPath),
            port: 3000,
            publicPath: '/',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            compress: true,
            openPage: '',
            overlay: true,
            inline: true,
            disableHostCheck: true,
            historyApiFallback: true,
            writeToDisk: true,
            hot: true,
        },
        plugins: [
            new BitBarWebpackProgressPlugin(),
            new CleanWebpackPlugin(),
            new CopyPlugin([
                { from: path.join(process.cwd(), 'static'), to: `${distPath}/static` },
                { from: `${landingSourcePath}/assets/images`, to: `${distPath}/assets/images` },
            ]),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            }),
            new ESLintPlugin({
                extensions: [ 'js', 'jsx' ],
                failOnError: true,
                failOnWarning: isProduction,
            }),
            new CircularDependencyPlugin({
                exclude: /node_modules|ComplicateDocumentModule|CheckList/,
                include: /questionnaire|landing|common/,
                allowAsyncCycles: false,
                failOnError: true,
                failOnWarning: isProduction,
                cwd: process.cwd(),
            }),
            ...cards.map((cardName) => {
                const name = cardName.split('.')[0];
                const fileName = name === 'main-post' ? 'index-page.html' : `${name}-page.html`;

                return (
                    new HtmlWebpackPlugin({
                        filename: fileName,
                        template: '!!ejs-webpack-loader!./landing/index.ejs',
                        minify: true,
                        inject: true,
                        templateParameters: {
                            domain,
                            isProduction,
                            cardFileName: cardName,
                        },
                    })
                );
            }),
            ...cards.map((cardName) => {
                const name = cardName.split('.')[0];
                const fileName = name === 'main-post' ? 'index.html' : `${name}.html`;

                return (
                    new HtmlWebpackPlugin({
                        filename: fileName,
                        template: '!!ejs-webpack-loader!./landing/containers/index.ejs',
                        minify: true,
                        inject: false,
                        templateParameters: {
                            domain,
                            isProduction,
                            cardFileName: cardName,
                            pageUrl: `${domain}${name === 'main-post' ? 'index-page.html' : `${name}-page.html`}`,
                        },
                    })
                );
            }),
            new webpack.DefinePlugin({
                DOMAIN: JSON.stringify(domain),
                NODE_ENV: JSON.stringify(mode),
                RSS_FEED_LINK: JSON.stringify(process.env.RSS_FEED_LINK || ''),
            }),
        ],
        optimization: {
            minimize: !devMode,
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    cache: true,
                    parallel: 2,
                    sourceMap: true,
                }),
            ],
            splitChunks: {
                chunks: 'all',
            },
        },
    };
};
