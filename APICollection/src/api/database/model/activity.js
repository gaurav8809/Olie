module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activities", {
        activity_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'user_id'
            },
            allowNull: false
        },
        route_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "routes",
                key: 'route_id'
            },
            allowNull: false
        },
        distance: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        speed: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        time: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        calories: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        points: {
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

    return Activity;
};