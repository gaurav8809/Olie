module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        group_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        group_image: {
            type: Sequelize.TEXT
        },
        is_ride_out: {
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
    },
    {
        timestamps: false
    });

    return Group;
};