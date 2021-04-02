module.exports = (sequelize, Sequelize) => {
    const Rental = sequelize.define("rentals", {
        rental_id: {
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
            type: Sequelize.TEXT,
            allowNull: false
        },
        vehicle_type: {
            type: Sequelize.ENUM,
            values: ['bike', 'scooter'],
            allowNull: false
        },
        website: {
            type: Sequelize.TEXT,
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

    return Rental;
};