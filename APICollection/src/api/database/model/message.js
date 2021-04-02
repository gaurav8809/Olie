module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        message_id: {
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
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'user_id'
            },
            allowNull: false
        },
        message_file_id: {
            type: Sequelize.INTEGER
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

    return Message;
};