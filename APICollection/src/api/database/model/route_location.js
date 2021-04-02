module.exports = (sequelize, Sequelize) => {
    const Route_location = sequelize.define("route_locations", {
        route_location_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        location_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "locations",
                key: 'location_id'
            },
            allowNull: false
        },
        sequence: {
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

    return Route_location;
};