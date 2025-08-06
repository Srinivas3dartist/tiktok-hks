// Main exports for tiktok-hks package
const Tiktok = require('./src/Tiktok');
const TiktokApiServiceProvider = require('./src/TiktokApiServiceProvider');
const TiktokApiFacade = require('./src/Facades/TiktokApiFacade');
const helpers = require('./src/helpers');

module.exports = {
    Tiktok,
    TiktokApiServiceProvider,
    TiktokApiFacade,
    helpers,
    // Convenience export for quick usage
    default: Tiktok
};
