const Sequelize = require('sequelize');
const { logging } = require('../helper/logging');

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_DIALECT = process.env.DATABASE_DIALECT;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: DATABASE_DIALECT || 'mysql',
  logging: logging.db,
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true,
    timestamps: false
  },
  // database wide options
  pool: {
    max: 70,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    match: [
      Sequelize.ConnectionError,
      Sequelize.ConnectionTimedOutError,
      Sequelize.TimeoutError,
      /Deadlock/i
    ],
    max: 10
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// table configurations
db.User = require("./model/user")(sequelize, Sequelize);
db.Friend = require("./model/friend")(sequelize, Sequelize);
db.Badge = require("./model/badge")(sequelize, Sequelize);
db.Challenge = require("./model/challenge")(sequelize, Sequelize);
db.User_achievement = require("./model/user_achievement")(sequelize, Sequelize);
db.Group = require("./model/group")(sequelize, Sequelize);
db.Group_user = require("./model/group_user")(sequelize, Sequelize);
db.Message = require("./model/message")(sequelize, Sequelize);
db.Message_file = require("./model/message_file")(sequelize, Sequelize);
db.Group_ride_out = require("./model/group_ride_out")(sequelize, Sequelize);
db.Location = require("./model/location")(sequelize, Sequelize);
db.Route = require("./model/route")(sequelize, Sequelize);
db.Route_location = require("./model/route_location")(sequelize, Sequelize);
db.Activity = require("./model/activity")(sequelize, Sequelize);
db.Rental = require("./model/rental")(sequelize, Sequelize);
db.Repair_shop = require("./model/repair_shop")(sequelize, Sequelize);
db.Setting = require("./model/setting")(sequelize, Sequelize);
db.Notification_setting = require("./model/notification_setting")(sequelize, Sequelize);
db.Permissions_setting = require("./model/permissions_setting")(sequelize, Sequelize);
db.Measurement_system_setting = require("./model/measurement_system_setting")(sequelize, Sequelize);
db.Music_preferences_setting = require("./model/music_preferences_setting")(sequelize, Sequelize);

db.syncDB = async (alter = false, force = false) => {
  await db.sequelize.sync({ alter: alter, force: force }).then(async () => {
    // set composite key for friends table
    await db.sequelize.queryInterface.addConstraint('friends', {
      fields: ['user_id', 'friend_user_id'],
      type: 'primary key',
      name: 'users_friend_key'
    });
    
    // start AUTO_INCREMENT from 1001
    await Promise.all(Object.values(db.sequelize.models).map(async function(model) {
      const query = `ALTER TABLE \`${model.tableName}\` AUTO_INCREMENT = 1001`;
      await db.sequelize.query(query);
    }));
  }).catch((error) => {
    logging.error('Error Occured while sync db!');
    throw error;
  });
}

module.exports = db;
