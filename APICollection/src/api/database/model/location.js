module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
        location_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        latitude: {
            type: Sequelize.DECIMAL(10, 8),
            allowNull: false
        },
        longitude: {
            type: Sequelize.DECIMAL(10, 8),
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

    return Location;
};