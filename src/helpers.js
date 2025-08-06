/**
 * Build url from host, path, query, etc.
 *
 * @param {string} host
 * @param {string|null} path
 * @param {object} query
 * @param {string|null} schema
 * @param {number|null} port
 * @return {string}
 */
function buildExternalUrl(host, path = null, query = {}, schema = null, port = null) {
    let url = host;
    
    if (port !== null) {
        url += ':' + port;
    }
    
    if (path !== null) {
        url += '/' + path.replace(/^\/+/, '');
    }
    
    if (Object.keys(query).length > 0) {
        const queryString = new URLSearchParams(query).toString();
        url += '?' + queryString;
    }
    
    return schema === null ? url : (schema + '://' + url);
}

module.exports = {
    buildExternalUrl
};
