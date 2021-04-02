module.exports = (sequelize, Sequelize) => {
    const Group_ride_out = sequelize.define("group_ride_outs", {
        group_ride_out_id: {
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
        start_time: {
            type: 'DATETIME',
            allowNull: false
        },
        end_time: {
            type: 'DATETIME',
            allowNull: false
        },
        group_ride_out_image: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        event_sponsored_by: {
            type: Sequelize.ENUM,
            values: ['company', 'individual'],
            defaultValue: 'individual',
            allowNull: false
        },
        comapny_name: {
            type: Sequelize.STRING,
        },
        comapny_email: {
            type: Sequelize.STRING(200),
        },
        website: {
            type: Sequelize.TEXT
        },
        group_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "groups",
                key: 'group_id'
            },
            allowNull: false
        },
        total_participants: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        max_participants: {
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

    return Group_ride_out;
};