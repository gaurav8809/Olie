module.exports = (sequelize, Sequelize) => {
    const Message_file = sequelize.define("message_files", {
        message_file_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "groups",
                key: 'group_id'
            },
            allowNull: false
        },
        message_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "messages",
                key: 'message_id'
            },
            allowNull: false
        },
        message_file: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file_type: {
            type: Sequelize.STRING,
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

    return Message_file;
};