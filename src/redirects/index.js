const common = require('./common.js');
const en = require('./en.js');

const redirectsArray = [...common, ...en];
module.exports = { redirectsArray };
