const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/index');
// const db = require('./api/database/index');
const { logging } = require('./api/helper/logging');

const app = express();

exports.start_server = async () => {
  try {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(cors({ exposedHeaders: 'auth_token' }));

    // sync database
    // await db.syncDB();
    
    app.use('/api', apiRoutes);

    app.get('/', function (req, res) {
      return res.send('Hello World!!!');
    });

    app.listen(process.env.PORT || 5000, function (error) {
      if (error) {
        logging.error('An error occured while staring node app!', error);
        return;
      }
      logging.info('Node application successfully started on ' + process.env.SITE_URL);
    });
  } catch (error) {
    logging.error(`Error Occured! - ${error}`);
    logging.error(`Error stack - ${error.stack}`);
  }
};
