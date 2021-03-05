const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
        // proxy: 'http://images.test',
        before(app) {
            // use proper mime-type for wasm files
            app.get('*.wasm', function(req, res, next) {
                const options = {
                    root: '/testApps/myAzkar/public/',
                    dotfiles: 'deny',
                    headers: {
                        'Content-Type': 'application/wasm',
                    },
                };
                res.sendFile(req.url, options, function(err) {
                    if (err) {
                        next(err);
                    }
                });
            });
        },
    },

    // chainWebpack: (webpackConfig) => {
    //     // webpackConfig.module
    //     //     .rule('wasm')
    //     //     .test(/.wasm$/)
    //     //     .use('wasm-loader')
    //     //     .loader('wasm-loader');
    // },

    configureWebpack: {
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/typeorm$/, function(
                result
            ) {
                result.request = result.request.replace(
                    /typeorm/,
                    'typeorm/browser'
                );
            }),
            // new webpack.ProvidePlugin({
            //     'window.SQL': 'sql.js/dist/sql-wasm.js',
            // }),
            new webpack.ProvidePlugin({
                'window.SQL': 'sql.js/dist/sql-wasm-debug.js',
            }),
            new CopyPlugin([
                {
                    from: 'node_modules/sql.js/dist/sql-wasm-debug.wasm',
                    to: '../sql-wasm-debug.wasm',
                },
            ]),
            new webpack.ProvidePlugin({
                'window.SQL': 'sql.js/dist/sql-wasm.js',
            }),
            new CopyPlugin([
                {
                    from: 'node_modules/sql.js/dist/sql-wasm.wasm',
                    to: '../sql-wasm.wasm',
                },
            ]),
        ],
    },

    pluginOptions: {
      i18n: {
        locale: 'ar',
        fallbackLocale: 'ar',
        localeDir: 'locales',
        enableLegacy: false
      }
    }
};
