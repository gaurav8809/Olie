module.exports = (sequelize, Sequelize) => {
    const Challenge = sequelize.define("challenges", {
        challenge_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        sub_title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        challenge_image: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        challenge_type: {
            type: Sequelize.ENUM,
            values: ['ride_out', 'once', 'time_specific'],
            allowNull: false
        },
        time_duration: {
            type: Sequelize.INTEGER,
        },
        time_type: {
            type: Sequelize.ENUM,
            values: ['day', 'week', 'month', 'year'],
        },
        is_recursive: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        start_time: {
            type: 'DATETIME',
            allowNull: false
        },
        end_time: {
            type: 'DATETIME',
            allowNull: false
        },
        website: {
            type: Sequelize.TEXT
        },
        total: {
            type: Sequelize.INTEGER,
        },
        measurement: {
            type: Sequelize.ENUM,
            values: ['points', 'ride_out', 'miles', 'calories', 'friends'],
        },
        created_by: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'user_id'
            },
            allowNull: false
        },
        created_time: {
            type: 'TIMESTAMP',
            defaultValue: new Date(),
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        timestamps: false,
    });

    return Challenge;
};