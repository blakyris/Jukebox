var Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .configureBabel(() => {}, {
        useBuiltIns: 'usage',
        corejs: 3
    })

    .configureBabel(function (babelConfig) {
        babelConfig.plugins = [
            "@babel/plugin-proposal-object-rest-spread","@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
        ]
    })

    .addEntry('app-css', './assets/css/app.css')
    .addEntry('bootstrap-css', './node_modules/bootstrap/dist/css/bootstrap.min.css')

    // enables Sass/SCSS support
    .enableSassLoader()

    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you use API Platform Admin (composer req api-admin)
    .enableReactPreset()
    .addEntry('js/app', './assets/js/app/app.js')

    .addEntry('app', './assets/js/app.js')
;

module.exports = Encore.getWebpackConfig();
