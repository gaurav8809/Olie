module.exports = (sequelize, Sequelize) => {
    const Route = sequelize.define("routes", {
        route_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        group_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "groups",
                key: 'group_id'
            },
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        total_distance: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        is_favorite: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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

    return Route;
};