// setting environment variables
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
if (!process.env.ENVIRONMENT || process.env.ENVIRONMENT == 'production') {
    require('dotenv').config({ path: path.join(__dirname, '.env-production') });
}

// start express api server
const db = require('./src/api/database/index');

// sync database
db.syncDB(false, true);
