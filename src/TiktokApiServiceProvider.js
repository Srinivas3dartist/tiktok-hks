const axios = require('axios');
const Tiktok = require('./Tiktok');

class TiktokApiServiceProvider {
    constructor() {
        this.client = null;
        this.tiktokInstance = null;
    }

    /**
     * Register the service provider
     */
    register() {
        // Load helpers
        this.loadHelpers();
        
        // Create HTTP client with configuration
        this.client = axios.create(this.getConfigAxios());
        
        // Create singleton instance
        this.tiktokInstance = new Tiktok(this.client);
        
        return this.tiktokInstance;
    }

    /**
     * Load helper functions
     */
    loadHelpers() {
        // Helpers are already loaded via require in Tiktok.js
        return require('./helpers');
    }

    /**
     * Get Axios configuration equivalent to Guzzle config
     * @return {Object}
     */
    getConfigAxios() {
        return {
            timeout: 5000,
            httpsAgent: new (require('https').Agent)({
                rejectUnauthorized: false // equivalent to verify: false
            }),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
            },
            validateStatus: function (status) {
                return true; // equivalent to http_errors: false
            },
            maxRedirects: 5, // equivalent to allow_redirects
            withCredentials: true // equivalent to cookies: true
        };
    }

    /**
     * Get the singleton instance
     * @return {Tiktok}
     */
    getInstance() {
        if (!this.tiktokInstance) {
            this.register();
        }
        return this.tiktokInstance;
    }
}

module.exports = TiktokApiServiceProvider;
