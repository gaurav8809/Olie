module.exports = (sequelize, Sequelize) => {
    const Badge = sequelize.define("badges", {
        badge_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        badge_image: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        total: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        measurement: {
            type: Sequelize.ENUM,
            values: ['points', 'ride_out', 'miles', 'calories', 'friends'],
            allowNull: false
        },
        reward_time: { // time in the form of seconds
            type: Sequelize.INTEGER,
            allowNull: false
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

    return Badge;
};